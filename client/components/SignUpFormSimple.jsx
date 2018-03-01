import React from 'react';

const SignUpFormSimple = () => (
  <div>
    <form action="/signup" method="post">
      <input placeholder="name" id="name" name="name" type="text" />
      <input placeholder="username" id="username" name="username" type="text" />
      <input placeholder="email" id="email" name="email" type="email" />
      <input placeholder="password" id="password" name="password" type="password" />
      <br />
      <button type="submit" name="action">Create my account</button>
    </form>
  </div>
);
export default SignUpFormSimple;
