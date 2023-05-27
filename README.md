#Tutorial: https://www.youtube.com/watch?v=ww94Jvi8JJo

1. npx nuxi init nuxt-fullstack-tutorial
2. npm install


Course: "Data Fetching" for more server stuff
Also look for "Middleware" from his tutorials since we need one


Using MongoDB
https://www.youtube.com/watch?v=EidO0c9L6b0


Using SupaBase for auth
https://www.youtube.com/watch?v=IcaL1RfnU44
Auth and Project link: https://app.supabase.com/
NOTE: SUPABASE_URL and SUPABASE_KEY are automatically used by supabase
after you install the module



CREATING A NEW DB with "bad auth" (includes the general process to avoid that)
1. https://www.mongodb.com
2. Create Cluster
3. Make a user with R/W perms, then make an ADMIN user (2 users total)
4. Use the ADMIN user for the URL string to connect.
5. Set network access (0.0.0.0/0 and add cur IP)
6. Try to connect in VSCode
7. Restart application, then connect again
(NOTE THAT THE DEFAULT CREATED USER DOESN'T WORK!)
https://stackoverflow.com/questions/60020381/mongodb-atlas-bad-auth-authentication-failed-code-8000


