# Page snapshot

```yaml
- generic [ref=e5]:
  - generic [ref=e6]:
    - heading "Sign in to MnemoPhi" [level=2] [ref=e7]
    - paragraph [ref=e8]: Business Dashboard
  - generic [ref=e9]:
    - generic [ref=e10]:
      - generic [ref=e11]:
        - generic [ref=e12]: Email address
        - textbox "Email address" [ref=e13]
      - generic [ref=e14]:
        - generic [ref=e15]: Password
        - textbox "Password" [ref=e16]
      - generic [ref=e17]:
        - generic [ref=e18]:
          - checkbox "Remember me" [ref=e19]
          - generic [ref=e20]: Remember me
        - link "Forgot your password?" [ref=e22] [cursor=pointer]:
          - /url: "#"
    - generic [ref=e23]:
      - button "Sign in" [ref=e24] [cursor=pointer]
      - button "Quick Login (Demo)" [ref=e25] [cursor=pointer]
    - generic [ref=e27]:
      - text: Don't have an account?
      - link "Sign up" [ref=e28] [cursor=pointer]:
        - /url: /auth/register
```