-- Manual PostGIS migration helpers (run after prisma migrate if geography columns are not created correctly)

-- Ensure geography columns have correct type
ALTER TABLE "TherapistProfile" ALTER COLUMN "location" TYPE geography(Point,4326) USING "location"::geography;
ALTER TABLE "SavedAddress" ALTER COLUMN "location" TYPE geography(Point,4326) USING "location"::geography;
ALTER TABLE "Booking" ALTER COLUMN "location" TYPE geography(Point,4326) USING "location"::geography;

-- Create GiST indexes for fast spatial queries
CREATE INDEX IF NOT EXISTS idx_therapist_location ON "TherapistProfile" USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_savedaddress_location ON "SavedAddress" USING GIST (location);
CREATE INDEX IF NOT EXISTS idx_booking_location ON "Booking" USING GIST (location);
