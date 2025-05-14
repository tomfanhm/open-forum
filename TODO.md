# Forum API Design To-Do List

## Authentication

- [x] Implement `POST /auth/register`
- [x] Implement `POST /auth/login`
- [x] Implement `POST /auth/logout`

## Users

- [ ] Implement `GET /users`
- [ ] Implement `GET /users/:id`
- [ ] Implement `PUT /users/:id`
- [ ] Implement `GET /users/:id/threads`
- [ ] Implement `GET /users/:id/posts`
- [ ] Implement `GET /users/:id/activity`

## User Preferences

- [ ] Implement `GET /users/:id/preferences`
- [ ] Implement `PUT /users/:id/preferences`

## Board Categories

- [ ] Implement `GET /categories`
- [ ] Implement `POST /categories`
- [ ] Implement `PUT /categories/:id`
- [ ] Implement `DELETE /categories/:id`

## Boards

- [ ] Implement `GET /boards`
- [ ] Implement `GET /boards/:id`
- [ ] Implement `POST /boards`
- [ ] Implement `PUT /boards/:id`
- [ ] Implement `DELETE /boards/:id`

## Board Moderators

- [ ] Implement `GET /boards/:id/moderators`
- [ ] Implement `POST /boards/:id/moderators`
- [ ] Implement `PUT /boards/:id/moderators/:user_id`
- [ ] Implement `DELETE /boards/:id/moderators/:user_id`

## Tags

- [ ] Implement `GET /tags`
- [ ] Implement `POST /tags`
- [ ] Implement `PUT /tags/:id`
- [ ] Implement `DELETE /tags/:id`

## Threads

- [ ] Implement `GET /threads`
- [ ] Implement `GET /threads/:id`
- [ ] Implement `POST /threads`
- [ ] Implement `PUT /threads/:id`
- [ ] Implement `DELETE /threads/:id`
- [ ] Implement `PUT /threads/:id/pin`
- [ ] Implement `PUT /threads/:id/lock`
- [ ] Implement `POST /threads/:id/subscribe`
- [ ] Implement `DELETE /threads/:id/subscribe`
- [ ] Implement `GET /threads/:id/subscriptions`

## Thread User Aliases

- [ ] Implement `POST /threads/:id/aliases`
- [ ] Implement `PUT /threads/:id/aliases/:user_id`
- [ ] Implement `DELETE /threads/:id/aliases/:user_id`

## Thread Watches

- [ ] Implement `POST /threads/:id/watch`
- [ ] Implement `PUT /threads/:id/watch`
- [ ] Implement `DELETE /threads/:id/watch`
- [ ] Implement `GET /threads/watched`

## Posts

- [ ] Implement `GET /posts`
- [ ] Implement `GET /posts/:id`
- [ ] Implement `POST /posts`
- [ ] Implement `PUT /posts/:id`
- [ ] Implement `DELETE /posts/:id`

## Attachments

- [ ] Implement `POST /posts/:id/attachments`
- [ ] Implement `GET /posts/:id/attachments`
- [ ] Implement `DELETE /attachments/:id`

## Votes

- [ ] Implement `POST /threads/:id/vote`
- [ ] Implement `DELETE /threads/:id/vote`
- [ ] Implement `POST /posts/:id/vote`
- [ ] Implement `DELETE /posts/:id/vote`

## Reports

- [ ] Implement `POST /reports`
- [ ] Implement `GET /reports`
- [ ] Implement `PUT /reports/:id`

## Moderation Logs

- [ ] Implement `GET /moderation-logs`

## Notifications

- [ ] Implement `GET /notifications`
- [ ] Implement `PUT /notifications/:id`
- [ ] Implement `PUT /notifications/mark-all-read`

## Messages

- [ ] Implement `GET /messages/inbox`
- [ ] Implement `GET /messages/sent`
- [ ] Implement `GET /messages/:id`
- [ ] Implement `POST /messages`
- [ ] Implement `PUT /messages/:id`
- [ ] Implement `DELETE /messages/:id`

## Statistics

- [ ] Implement `GET /statistics`

## Search

- [ ] Implement `GET /search`
