<template>
    <div class='items-center mx-10'>
        <button @click.stop="onClickRefresh"
            class="mb-6 items-end border border-green-400 hover:border-green-500 text-green-400 hover:text-green-500 rounded-full px-2 py-1 focus:outline-none"
            :class="{ 'animate__animated animate__shakeX': isRefreshing }" 
        >
            Refresh
        </button>

        <h1 class="text-xl font-bold border-b border-gray-400 pb-2 mb-5">Things</h1>
        
        <template v-if="hasThings">    
            <div class="border rounded-xl border-gray-600 mb-2 p-1"
                :class="getThingClass(thing.id)" 
                v-for="(thing, index) in things"
                :key="`thing-${index}`"
                @click.stop="onClickDetails(thing.id)"
            >
                <b :class="{ 'text-gray-600': !flagged.includes(thing.id) }">{{ thing.name }}</b>
                <div class="pt-2">
                    <button 
                        @click.stop="onClickRemove(thing.id)" 
                        class="border border-blue-300 hover:border-blue-500 rounded-full px-2 text-blue-300 hover:text-blue-500 mx-2 focus:outline-none"
                    >
                        Remove
                    </button>
                    
                    <button 
                        @click.stop="onClickFlag(thing.id)"
                        :class="{ 'border bg-red-300 hover:bg-red-500 border-red-300 text-white rounded-full px-2 mx-2 focus:outline-none': flagged.includes(thing.id),
                                'border border-red-300 hover:border-red-500 text-red-300 hover:text-red-500 rounded-full px-2 mx-2 focus:outline-none': !flagged.includes(thing.id)
                            }"
                        >
                        {{ flagged.includes(thing.id) ? 'Unflag' : 'Flag' }}
                    </button>
                </div>
                <thing-details :thing="thing" v-if="selectedId === thing.id" 
                    :class="flagged.includes(thing.id) ? 'border-red-300' :'border-gray-600'"
                >
                </thing-details>
            </div>
        </template>
        <template v-else>
            <div class="text-gray-500 text-sm">
                There are no things
            </div>
        </template>
    </div>
</template>

<script>
import { getThings } from '../api'
import ThingDetails from './ThingDetails'

export default {
    components: { 
        ThingDetails 
    },
    data () {
        return {
            selectedId: null,
            things: [],
            flagged: [],
            isRefreshing: false,
            isBeingRemoved: []
            // isBeingRemoved: null
        }
    },
    async mounted () {
        this.things = await getThings()  
        console.log(this.things)     

        // this.isBeingRemoved = new Array(this.things.length).fill(false)

        let style = document.createElement('link');
        style.type = 'text/css'
        style.rel = 'stylesheet'
        style.href = "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
        document.head.appendChild(style);
    },
    computed: {
        hasThings () {
            return this.things?.length > 0
        },
    },
    methods: {
        onClickDetails (id) {
            if (this.selectedId === id) {
                this.selectedId = null
            }
            else{
                this.selectedId = id
            }
        },
        onClickRefresh () {
            this.isRefreshing = true
            getThings().then(result => {
                this.things = result
                this.isRefreshing = false
            })
        },
        onClickRemove (id) {
            this.isBeingRemoved.push(id)
            new Promise(resolve => setTimeout(resolve, 1000)).then(() => {
                this.things = this.things.filter(
                (thing) => {
                    return thing.id !== id
                })
                console.log(this.things)

                this.isBeingRemoved = this.isBeingRemoved.filter(
                    (removedId) => {
                        return removedId !== id
                    }
                )
            })

            
        },
        onClickFlag (id) {
            if (this.flagged.includes(id)){
                this.flagged = this.flagged.filter(flaggedId => {
                    return id !== flaggedId
                })
            }
            else {
                this.flagged.push(id)
            }
        },
        getThingClass (id) {
            let outputClass = ""

            if (this.flagged.includes(id)){
                outputClass = outputClass.concat("animate__animated animate__pulse border-red-300 hover:border-red-500 text-red-300 hover:text-red-500 ")
            }

            if (this.isBeingRemoved.includes(id)){
                outputClass = outputClass.concat("animate__animated animate__shakeX")
            }

            return outputClass
        }
    }
}
</script>
