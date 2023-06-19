<script>
  const fetchProducts = (async () => {
    const response = await fetch('http://127.0.0.1:8000/all_products/')
    return await response.json()
  })()
</script>

{#await fetchProducts}
	<p>...waiting</p>
{:then product}
  {#each product as { name, category, quantity }, i }
    <p>
      {i + 1}: {name} - {category} - {quantity}
    </p>
  {/each}
{:catch error}
	<p>Error: {error}</p>
{/await}
