-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "model" TEXT NOT NULL,
    "modelId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "ip" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
