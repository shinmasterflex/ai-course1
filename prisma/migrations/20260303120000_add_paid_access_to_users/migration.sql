-- AlterTable
ALTER TABLE "users"
ADD COLUMN "paidAt" TIMESTAMP(3),
ADD COLUMN "stripeCheckoutSessionId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_stripeCheckoutSessionId_key" ON "users"("stripeCheckoutSessionId");
