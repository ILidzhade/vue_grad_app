<template>
    <div class="text-sm text-gray-600 m-2 border rounded-xl py-2">
        <b> Details: </b>
        <div class="flex justify-center">
            <div class="text-gray-400 mr-2">Name:</div> <div>{{ thing.name }}</div>
        </div>
        <div class="flex justify-center">
            <div class="text-gray-400 mr-2">ID:</div> <div>{{ thing.id }}</div>
        </div>
        <div class="flex justify-center">
            <div class="text-gray-400">Keywords:</div>
            <div 
                class="ml-2 border rounded-full border-gray-500 px-2"
                v-for="(keyword, index) in getKeywords"
                :key="`keyword-${index}`"
            >
                {{ keyword }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ThingDetails',
    props: ['thing'],
    computed: {
        getKeywords () {
            return this.thing.keywords
        }
    }
}
</script>

<style lang="scss" scoped>
</style>