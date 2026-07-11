-- Contraintes CHECK pour les statuts (workflows distincts).
-- Prisma 7 ne gère pas nativement les CHECK : on les pose en SQL.

ALTER TABLE "applications"
  ADD CONSTRAINT "applications_status_check"
  CHECK ("status" IN ('new', 'read', 'accepted', 'rejected'));

ALTER TABLE "contact_messages"
  ADD CONSTRAINT "contact_messages_status_check"
  CHECK ("status" IN ('new', 'read', 'replied'));

ALTER TABLE "users"
  ADD CONSTRAINT "users_role_check"
  CHECK ("role" IN ('admin'));
