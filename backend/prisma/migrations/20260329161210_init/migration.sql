-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "displayname" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "pictureURL" TEXT NOT NULL DEFAULT 'https://res.cloudinary.com/dic5sskvu/image/upload/v1771032844/defaultAvatar_szkhjs.webp',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
