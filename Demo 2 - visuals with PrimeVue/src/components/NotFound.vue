<script setup>
</script>

<template>
  <div class="main">
    <div class="content">
      <div class="font-404">
        <h1>4<span>0</span>4</h1>
      </div>
      <p>The page you are looking for might have been removed, its URL changed or is temporarily unavailable.</p>
      <router-link :to="{ name: 'home-page' }">
        Back to Home
      </router-link>
    </div>
  </div>
</template>

<style   scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}
.main {
  width: 100%;
  height: 50vh;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  width: 460px;
  line-height: 1.4;
  text-align: center;
}
.content .font-404 {
  height: 158px;
  line-height: 153px;
}
.content .font-404 h1 {
  font-family: "Josefin Sans", sans-serif;
  color: #222;
  font-size: 220px;
  letter-spacing: 10px;
  margin: 0px;
  font-weight: 700;
  text-shadow: 2px 2px 0px var(--highlight-text-color), -2px -2px 0px var(--highlight-text-color);
}

.content .font-404 h1 > span {
  text-shadow: 2px 2px 0px var(--highlight-bg), -2px -2px 0px var(--highlight-bg), 0px 0px 8px var(--primary-color);
}

.content p {
  font-family: "Josefin Sans", sans-serif;
  color: var(--highlight-text-color);
  font-size: 16px;
  font-weight: 400;
  margin-top: 0px;
  margin-bottom: 15px;
}

.content a {
  font-family: "Josefin Sans", sans-serif;
  font-size: 14px;
  text-decoration: none;
  text-transform: uppercase;
  background: transparent;
  color: var(--highlight-text-color);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  display: inline-block;
  padding: 10px 25px;
  font-weight: 700;
  -webkit-transition: 0.2s all;
  transition: 0.3s all ease-in;
  background-color: var(--primary-color);
}

.content a:hover {
  color: var(--highlight-text-color);
  background-color: transparent;
}

@media only screen and (max-width: 480px) {
  .content {
    padding: 0 30px;
  }
  .content .font-404 {
    height: 122px;
    line-height: 122px;
  }

  .content .font-404 h1 {
    font-size: 122px;
  }
}
</style>
