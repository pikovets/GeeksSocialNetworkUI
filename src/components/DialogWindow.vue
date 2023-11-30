<template>
  <div class="overlay" v-show="show">
    <div class="dialog-window">
      <div class="header">
        <button @click="$emit('close')" class="close-btn">
          <i class="fa fa-window-close" aria-hidden="true"></i>
        </button>
      </div>
      <div class="dialog-content">
        <p>{{ message }}</p>
      </div>
      <div class="dialog-bottom">
        <button class="log-in-btn" @click="goToLoginPage">Log In</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    message: {
      type: String,
      required: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    goToLoginPage() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dialog-window {
  position: relative;
  width: 30em;
  z-index: 10000;
  background-color: #343534;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
}

.header {
  display: flex;
  justify-content: flex-end;
  padding-top: 5px;
  padding-right: 10px;
  margin-bottom: 1em;
}

.close-btn {
  background-color: transparent;
  border-style: none;
  color: #9e9e9e;
  font-size: 1.5rem;
}

.close-btn:hover {
  color: #f44336;
  cursor: pointer;
  transform: scale(1.05);
}

.close-btn:active {
  transform: scale(0.95);
}

.dialog-content {
  padding: 0px 15px;
  color: white;
  margin-bottom: 1em;
  text-align: justify;
}

.dialog-bottom {
  display: flex;
  justify-content: center;
}

.log-in-btn {
  align-items: center;
  border-style: none;
  border-radius: 0.5em;
  padding: 5px 15px;
  background-color: #48883e;
  color: white;
  margin-bottom: 1em;
  font-weight: bold;
}

.log-in-btn:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.log-in-btn:active {
  transform: scale(0.95);
}
</style>
