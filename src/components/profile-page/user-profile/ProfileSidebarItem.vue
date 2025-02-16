<template>
  <div @click="goToItemPage" class="profile-item">
    <div class="avatar-container">
      <img :src="avatar" class="avatar" />
    </div>
    <p class="name">{{ itemName }}</p>
  </div>
</template>

<script>
import defaultAvatar from "@/assets/img/avatars/default-avatar.jpg";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    type: {
      type: String, // "user" or "community"
      required: true,
    },
  },
  computed: {
    avatar() {
      return this.item.photoLink ? this.item.photoLink : defaultAvatar;
    },
    itemName() {
      return this.type === "user" ? this.item.firstName : this.item.name;
    },
  },
  methods: {
    goToItemPage() {
      this.$router.push({
        name: this.type === "user" ? "user-profile" : "community-profile",
        params: {id: this.item.id},
      });
    },
  },
};
</script>

<style scoped>
.profile-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 5px 0;
  transition: background-color 0.2s ease-in-out;
}

.profile-item:hover {
  background-color: #2f302f;
  border-radius: 5px;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.name {
  font-size: 0.8rem;
  text-align: center;
}
</style>
