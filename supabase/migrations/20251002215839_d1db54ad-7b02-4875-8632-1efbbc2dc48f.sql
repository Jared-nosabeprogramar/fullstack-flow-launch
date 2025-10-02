-- Create enum for roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create students table
CREATE TABLE public.students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  apellido text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar text,
  precio numeric(10,2),
  ciclo text,
  promedio_general numeric(5,2) DEFAULT 0,
  tasa_exito numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Students policies (only admins can access)
CREATE POLICY "Admins can view students"
ON public.students FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert students"
ON public.students FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update students"
ON public.students FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete students"
ON public.students FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create student_personalities table
CREATE TABLE public.student_personalities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tipo_personalidad text NOT NULL,
  estilo_aprendizaje text,
  descripcion text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.student_personalities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage personalities"
ON public.student_personalities FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create ai_tips table for generated recommendations
CREATE TABLE public.ai_tips (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  categoria text NOT NULL,
  contenido text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.ai_tips ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage tips"
ON public.ai_tips FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create student_stats table for detailed statistics
CREATE TABLE public.student_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES public.students(id) ON DELETE CASCADE NOT NULL,
  mes text NOT NULL,
  aprobadas integer DEFAULT 0,
  reprobadas integer DEFAULT 0,
  promedio numeric(5,2) DEFAULT 0,
  asistencia numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE (student_id, mes)
);

ALTER TABLE public.student_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage stats"
ON public.student_stats FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- User roles policies
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add triggers for updated_at
CREATE TRIGGER update_students_updated_at
BEFORE UPDATE ON public.students
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_personalities_updated_at
BEFORE UPDATE ON public.student_personalities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();