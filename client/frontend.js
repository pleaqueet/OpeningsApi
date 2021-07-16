import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.js'

Vue.component('loader', {
    template: `
    <div style="display: flex;justify-content: center;align-items: center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  `
})

new Vue({
    el: '#app',
    data() {
        return {
            loading: false,
            form: {
                title: '',
                audio: '',
                difficulty: 1
            },
            openings: []
        }
    },
    computed: {
        canCreate() {
            return this.form.title.trim() && this.form.audio.trim()
        }
    },
    methods: {
        async createOpening() {
            const {...opening} = this.form

            const newOpening = await request('/api/openings', 'POST', opening)

            this.openings.push(newOpening)

            this.form.title = this.form.audio = ''
        },
        async removeOpening(id) {
            await request(`/api/openings/${id}`, 'DELETE')
            this.openings = this.openings.filter(op => op._id !== id)
        }
    },
    async mounted() {
        this.loading = true
        this.openings = await request('/api/openings')
        this.loading = false
    }
})

async function request(url, method = 'GET', data = null) {
    try {
        const headers = {}
        let body

        if (data) {
            headers['Content-Type'] = 'application/json'
            body = JSON.stringify(data)
        }

        const response = await fetch(url, {
            method,
            headers,
            body
        })
        return await response.json()
    } catch (e) {
        console.warn('Error:', e.message)
    }
}
