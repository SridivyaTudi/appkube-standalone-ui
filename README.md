Bucket: static-site-test-customresourcestack-s3bucketroot-1790n4hhgd8xv

Create a response policy in cloud front. 

Go to a cloudfront distributions and select a paritcualr disrtibution related to above bucket. Go to behaviour and create a behaviour with the new create response header policy.

To build:
npm run build

Upload the files inside the build folder to the bucket.

To Run locally:
npm start