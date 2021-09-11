# Coursepage

This Page is for individual courses. The Page uses the url query `?name=example` to determine which course page it is for. It then does a fetch request of all the courses, and tries to match the url query name to any of them. If it does not exist, it returns a "That course name does not exist" page, otherwise, it returns the course page.