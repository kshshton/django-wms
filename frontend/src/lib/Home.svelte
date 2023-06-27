<script>
    import { Router, Route, Link } from "svelte-navigator";
    import Products from "./Products.svelte";
    import Register from "./User/Register.svelte";
</script>

<Router>
    <header>
        <h2>WMS</h2>

        <nav>
            <Link to="/">Menu</Link>
            <Link to="products">Produkty</Link>
            <Link to="register">Rejestracja</Link>
        </nav>
    </header>

    <main>
        <Route path="/">
            <p>...</p>
        </Route>

        <Route path="products">
            <Products />
        </Route>

        <Route path="register">
            <Register />
        </Route>
    </main>
</Router>