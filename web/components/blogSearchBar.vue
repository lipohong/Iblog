<template>
    <div class="searchBarContainer">
        <input @input="updateSearch($event.target.value)" :placeholder="$t('pages.blog.search')">
        <v-sheet class="searchButton" color="primary" @click="searchFunction">
            <v-icon dark>mdi-magnify</v-icon>
        </v-sheet>
    </div>
</template>
<script>
    export default {
        props: ['searchFunction'],
        methods: {
            updateSearch(search) {
                this.$emit('inputChange', search);
            }
        }
    }
</script>