## Litter 🐱- a twitter clone as our final group assignment for the course Cloud-Native Applications (2DV013)

[Assignment description](https://coursepress.lnu.se/courses/cloud-native-applications/group-project/litter)

[Deployed URL](https://cscloud7-103.lnu.se/api/testing/login) 
(auth is currently only through OAuth gitlab.lnu.se so this link will log in on a test account to expose auth-locked functionality)

### Features 🚀
* Tweets
* Likes
* Comments (you can also like comments)
* Follow/unfollow
* Following, home/all, profile and comments feed
* All feeds are updated in real-time through PostgreSQL publications and tanstack-query
* Pagination with lazy-loading
* Pixel-perfect loading skeletons



### Technologies 💻
* Next.js (app router)
* Supabase for storage, auth and realtime
* Tanstack-query for state management, caching and data fetching
* Currently deployed via gitlab-runners to our schools openstack enviroment through the use of Kubernetes, Terraform, Docker, Skaffold and Nginx (load-balancer, kubernetes ingress controller)



![System Design](https://i.imgur.com/GK23bTI.jpeg)
