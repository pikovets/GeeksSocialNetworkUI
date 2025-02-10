<template>
  <div @click="goToCommunityPage" class="community-cell">
    <div class="community-avatar-container">
      <img :src="avatar" class="community-avatar" />
    </div>
    <p class="community-name">{{ community.name }}</p>
  </div>
</template>

<script>
import defaultAvatar from "@/assets/img/avatars/default-avatar.jpg";

export default {
  props: {
    community: {
      type: Object,
      required: true,
    },
  },
  computed: {
    avatar() {
      return this.community.photoLink ? this.community.photoLink : defaultAvatar;
    },
  },
  methods: {
    goToCommunityPage() {
      this.$router.push({
        name: "communityProfile",
        params: { id: this.community.id },
      });
    },
  },
};
</script>

<style scoped>
.community-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 5px 0;
  transition: background-color 0.2s ease-in-out;
}

.community-cell:hover {
  background-color: #2f302f;
  border-radius: 5px;
}

.community-avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 5px;
}

.community-avatar {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
}

.community-name {
  font-size: 0.8rem;
  text-align: center;
}
</style>
