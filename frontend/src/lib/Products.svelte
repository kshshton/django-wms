<script>
  import Grid from "gridjs-svelte"
  const fetchProducts = (async () => {
    const response = await fetch('http://127.0.0.1:8000/all_products/')
    return await response.json()
  })()
</script>

{#await fetchProducts}
  <p>...waiting</p>
{:then product}
  <Grid data={product} />
{:catch error}
  <p>Error: {error}</p>
{/await}

<style global>
  @import "https://cdn.jsdelivr.net/npm/gridjs/dist/theme/mermaid.min.css";
</style>
