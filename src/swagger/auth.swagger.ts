/**
 * @openapi
 * tags:
 *   - name: Auth
 *     description: Authentication and session endpoints
 */
/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Register a new user
 *     description: Create a new user account. Returns created user and a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterBody'
 *           examples:
 *             basic:
 *               value:
 *                 name: John Doe
 *                 email: john@example.com
 *                 password: strongPassword123
 *     responses:
 *       '201':
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             examples:
 *               success:
 *                 value:
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                   user:
 *                     id: "user_123"
 *                     name: John Doe
 *                     email: john@example.com
 *       '400':
 *         description: Bad request / validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '409':
 *         description: Email already exists
 *
 * /auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Login with email and password
 *     description: Returns a JWT token and user profile when credentials are valid.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginBody'
 *           examples:
 *             basic:
 *               value:
 *                 email: john@example.com
 *                 password: strongPassword123
 *     responses:
 *       '200':
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *       '400':
 *         description: Bad request
 *       '401':
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /auth/me:
 *   get:
 *     tags:
 *       - Auth
 *     summary: Get current authenticated user
 *     description: Returns the profile of the currently authenticated user.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Current user profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *
 * /auth/test-email:
 *   post:
 *     tags:
 *       - Auth
 *     summary: Send a test email
 *     description: Useful for verifying email transport is configured (development/testing).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmailTestBody'
 *           examples:
 *             basic:
 *               value:
 *                 email: test@example.com
 *                 subject: "Hello from Tourism Ride"
 *                 message: "This is a test email"
 *     responses:
 *       '200':
 *         description: Email sent successfully (or queued)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MessageResponse'
 *       '400':
 *         description: Invalid email or request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '500':
 *         description: Failed to send email
 *
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     RegisterBody:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *           description: Optional role for the user (e.g. user, driver)
 *       required:
 *         - email
 *         - password
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *       required:
 *         - email
 *         - password
 *     EmailTestBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         subject:
 *           type: string
 *         message:
 *           type: string
 *       required:
 *         - email
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         phone:
 *           type: string
 *         role:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *     AuthResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *         refreshToken:
 *           type: string
 *           description: Optional refresh token
 *         user:
 *           $ref: '#/components/schemas/User'
 *     MessageResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *         details:
 *           type: object
 */

// NOTE: This file contains OpenAPI (swagger-jsdoc) documentation for the Auth module.
// Keep only documentation here — runtime code belongs in the modules folder.

export default {};
