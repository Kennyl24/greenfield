import React from 'react';

const SignUpFormExtended = () => (
  <div className="input-field">
    <form action="/signup" method="post">
      <input placeholder="name" name="name" type="text" />
      <input placeholder="username" name="username" type="text" />
      <input placeholder="email" name="email" type="email" />
      <input placeholder="password" name="password" type="password" />
      <input placeholder="age" name="age" type="age" />
      <input placeholder="tell us about yourself" name="biography" type="biography" />
      <input placeholder="city, state" name="location" type="location" />
      <input placeholder="image" name="image" type="file" />
      <br />
      <button>Create my account!</button>
    </form>
  </div>
);
export default SignUpFormExtended;
