<script>
    import { Router, Route, Link } from "svelte-navigator";
    import Products from "./Products.svelte";
</script>

<Router>
    <header>
        <h2>WMS</h2>

        <nav>
            <Link to="/">Home</Link>
            <Link to="products">Products</Link>
        </nav>
    </header>

    <main>
        <Route path="/">
            <p>It's just a home page...</p>
        </Route>

        <Route path="products">
            <Products />
        </Route>
    </main>
</Router>