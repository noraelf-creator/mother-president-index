-- Supabase SQL Editorで実行。公開キーだけでは書き込めない設計。
create schema if not exists author_private;
revoke all on schema author_private from public, anon, authenticated;
create table if not exists author_private.index_authors (user_id uuid primary key references auth.users(id));
alter table author_private.index_authors enable row level security;
create or replace function public.is_index_author() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists(select 1 from author_private.index_authors where user_id = (select auth.uid())); $$;
revoke all on function public.is_index_author() from public;
grant execute on function public.is_index_author() to anon, authenticated;
create table if not exists public.author_notes (
 id uuid primary key,
 kind text not null check(kind in ('memo','todo')),
 page_id text not null, section_id text not null, title text not null,
 body text not null check(length(body)<=12000),
 status text not null check(status in ('未対応','対応中','反映済み','保留')),
 character text not null default '', card text not null default '',
 owner_id uuid not null default auth.uid() references auth.users(id),
 created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
alter table public.author_notes enable row level security;
revoke all on public.author_notes from anon, authenticated;
grant select on public.author_notes to anon, authenticated;
grant insert, update on public.author_notes to authenticated;
create policy "index_public_read" on public.author_notes for select to anon, authenticated using (true);
create policy "index_author_insert" on public.author_notes for insert to authenticated with check ((select public.is_index_author()) and owner_id=(select auth.uid()));
create policy "index_author_update" on public.author_notes for update to authenticated using ((select public.is_index_author()) and owner_id=(select auth.uid())) with check ((select public.is_index_author()) and owner_id=(select auth.uid()));
create or replace function public.index_note_timestamp() returns trigger language plpgsql set search_path='' as $$
begin new.updated_at=clock_timestamp(); new.created_at=old.created_at; new.owner_id=old.owner_id; return new; end; $$;
create trigger index_notes_timestamp before update on public.author_notes for each row execute function public.index_note_timestamp();
create unique index index_todo_unique on public.author_notes(section_id) where kind='todo';
-- 作者ユーザーをSupabase Authenticationで用意した後、UUIDを置換して別途実行：
-- insert into author_private.index_authors(user_id) values ('作者のユーザーUUID');
-- 未登録ユーザーは認証しても書込不可。service_roleキーをWebサイトに置かないこと。
