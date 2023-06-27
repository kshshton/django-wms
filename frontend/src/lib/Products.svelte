<script>
    import Grid from "gridjs-svelte"

    const fetchProducts = (async () => {
        const response = await fetch('http://127.0.0.1:8000/all_products/')
        return await response.json()
    })()
</script>

{#await fetchProducts}
    <p>...przetwarzanie danych</p>
{:then product}
    <Grid data={product} />
{:catch error}
    <p>Błąd: {error}</p>
{/await}

<style global>
    @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>
