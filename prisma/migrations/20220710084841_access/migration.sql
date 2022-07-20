-- CreateTable
CREATE TABLE "Access" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Access_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccess" (
    "userId" INTEGER NOT NULL,
    "accessId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "UserAccess_userId_key" ON "UserAccess"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "UserAccess_accessId_key" ON "UserAccess"("accessId");

-- AddForeignKey
ALTER TABLE "UserAccess" ADD CONSTRAINT "UserAccess_accessId_fkey" FOREIGN KEY ("accessId") REFERENCES "Access"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAccess" ADD CONSTRAINT "UserAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
