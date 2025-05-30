<script setup>
const props = defineProps({
    item: {
        type: Object,
        required: true,
    },
})
</script>

<template>
    <div class="card">
        <img
            v-if="item.cover_url"
            :src="item.cover_url"
            alt="cover"
            class="card-cover"
        />
        <div class="card-body">
            <h3 class="card-title">{{ item.title }}</h3>
            <p class="card-description">{{ item.description }}</p>
            <div class="card-tags">
                <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="tag"
                >
                    {{ tag }}
                </span>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    margin: 0.5rem 0;
    transition: transform 0.15s ease;
}
.card:hover {
    transform: translateY(-4px);
}
.card-cover {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
}
.card-body {
    padding: 1rem;
}
.card-title {
    margin: 0 0 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    color: #222;
}
.card-description {
    margin: 0 0 0.75rem;
    font-size: 0.875rem;
    color: #555;
    line-height: 1.35;
}
.card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
}
.tag {
    background: #e0e0e0;
    border-radius: 12px;
    padding: 2px 8px;
    font-size: 0.75rem;
    line-height: 1.4;
    color: #333;
    white-space: nowrap;
}
</style>