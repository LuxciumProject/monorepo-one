#!/usr/bin/sh
pnpx prisma generate
pnpx prisma db push
pnpx prisma validate
