<template>
  <div class="main">
    <NavBar />
    <div class="content-wrapper">
      <slot />
    </div>
    <Footer />
  </div>
  <div style="position:absolute;border-radius:inherit;top:0;right:0;bottom:0;left:0;z-index: -10;"
    data-framer-background-image-wrapper="true"><img decoding="async" sizes="100vw"
      srcset="https://framerusercontent.com/images/BAX9OANoPSeaf507qrJgkidXG8U.png?scale-down-to=1024 914w,https://framerusercontent.com/images/BAX9OANoPSeaf507qrJgkidXG8U.png?scale-down-to=2048 1828w,https://framerusercontent.com/images/BAX9OANoPSeaf507qrJgkidXG8U.png 3600w"
      src="https://framerusercontent.com/images/BAX9OANoPSeaf507qrJgkidXG8U.png" alt=""
      style="display:block;width:100%;height:100%;border-radius:inherit;object-position:center;object-fit:fill;image-rendering:auto">
  </div>
</template>

<style lang="scss">
@import '@/assets/scss/components/_form.scss';
@import '@/assets/scss/components/_blog.scss';
@import '@/assets/scss/components/_trend.scss';
@import '@/assets/scss/components/_footer.scss';
</style>
