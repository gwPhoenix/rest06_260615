-- ============================================================
-- CODEWAVE — 초기 스키마
-- ============================================================

-- 프로필 (auth.users 확장)
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  phone       text,
  avatar_url  text,
  updated_at  timestamptz default now()
);

-- 강좌
create table if not exists public.courses (
  id          text primary key,
  cat         text not null,
  title       text not null,
  sub         text,
  level       text,
  weeks       integer,
  lessons     integer,
  rating      decimal(3,1) default 4.9,
  students    integer default 0,
  price       integer not null,
  was         integer,
  grad        text,
  icon        text,
  best        boolean default false,
  tag_class   text,
  tag         text,
  created_at  timestamptz default now()
);

-- 수강 신청
create table if not exists public.enrollments (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade not null,
  course_id   text references public.courses(id) not null,
  enrolled_at timestamptz default now(),
  unique(user_id, course_id)
);

-- 결제 내역
create table if not exists public.payments (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references auth.users(id) not null,
  course_id    text references public.courses(id) not null,
  imp_uid      text unique not null,
  merchant_uid text unique not null,
  amount       integer not null,
  method       text,
  status       text default 'paid',
  paid_at      timestamptz default now()
);

-- 수강 후기
create table if not exists public.reviews (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id),
  course_id   text references public.courses(id),
  name        text,
  initial     text,
  grad        text,
  rating      integer check(rating between 1 and 5) default 5,
  review_text text,
  job         text,
  created_at  timestamptz default now()
);

-- ============================================================
-- RLS 활성화
-- ============================================================
alter table public.profiles    enable row level security;
alter table public.courses     enable row level security;
alter table public.enrollments enable row level security;
alter table public.payments    enable row level security;
alter table public.reviews     enable row level security;

-- 강좌·후기는 누구나 읽기 가능
create policy "Public read courses" on public.courses  for select using (true);
create policy "Public read reviews" on public.reviews  for select using (true);

-- 수강 신청: 본인 것만
create policy "Own enrollments select" on public.enrollments for select using (auth.uid() = user_id);
create policy "Own enrollments insert" on public.enrollments for insert with check (auth.uid() = user_id);

-- 결제: 본인 것만
create policy "Own payments select" on public.payments for select using (auth.uid() = user_id);
create policy "Own payments insert" on public.payments for insert with check (auth.uid() = user_id);

-- 프로필: 본인 것만
create policy "Own profile select" on public.profiles for select using (auth.uid() = id);
create policy "Own profile insert" on public.profiles for insert with check (auth.uid() = id);
create policy "Own profile update" on public.profiles for update using (auth.uid() = id);

-- ============================================================
-- 신규 가입 시 프로필 자동 생성 트리거
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles(id, name, avatar_url)
  values(
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  )
  on conflict(id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- 강좌 초기 데이터 삽입
-- ============================================================
insert into public.courses(id,cat,title,sub,level,weeks,lessons,rating,students,price,was,grad,icon,best,tag_class,tag)
values
  ('fe','코딩','프론트엔드 개발 부트캠프','React · TypeScript · Next.js','입문→실무',24,148,4.9,8200,790000,1290000,'linear-gradient(135deg,#2D5BFF,#14D6D6)','</>',true,'chip-lime','BEST'),
  ('ai','코딩','AI · 데이터 사이언스','Python · 머신러닝 · LLM','초중급',20,132,4.8,5400,890000,1390000,'linear-gradient(135deg,#7B40F2,#2D5BFF)','🤖',false,'chip-purple','HOT'),
  ('jeongcheo','자격증','정보처리기사 완성반','필기+실기 한 번에 합격','자격증',12,96,4.9,11200,240000,390000,'linear-gradient(135deg,#14D6D6,#2D5BFF)','✓',false,'chip-cyan','합격보장'),
  ('be','코딩','백엔드 개발 마스터','Java · Spring · 클라우드','중급',22,140,4.8,4100,850000,1290000,'linear-gradient(135deg,#0A0E1F,#1B36C9)','⚙',false,'chip-blue','NEW'),
  ('sqld','자격증','SQLD 단기 합격반','데이터 모델링 · SQL 활용','자격증',6,48,4.7,6800,180000,290000,'linear-gradient(135deg,#2D5BFF,#14D6D6)','🗄',false,'chip-cyan','합격보장'),
  ('excel','컴퓨터활용','실무 엑셀 & 데이터 분석','함수 · 피벗 · 대시보드 · 자동화','입문',8,64,4.9,9300,150000,240000,'linear-gradient(135deg,#14D6D6,#C8FF3D)','📊',false,'chip-lime','BEST'),
  ('comphwal','컴퓨터활용','컴퓨터활용능력 1급','필기+실기 자격증 완전정복','자격증',8,72,4.8,7600,130000,220000,'linear-gradient(135deg,#14D6D6,#2D5BFF)','⌨',false,'chip-cyan','합격보장'),
  ('cloud','코딩','클라우드 & DevOps','AWS · Docker · CI/CD','중상급',16,104,4.7,2900,790000,1190000,'linear-gradient(135deg,#7B40F2,#2D5BFF)','☁',false,'chip-purple','심화'),
  ('ux','코딩','UX 엔지니어링','디자인 시스템 · 인터랙션','중급',14,88,4.8,3300,690000,990000,'linear-gradient(135deg,#FF5DA2,#7B40F2)','✦',false,'chip-purple','NEW')
on conflict(id) do nothing;
