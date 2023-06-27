<script>
	import { useForm, Hint, HintGroup, validators, required, minLength, email } from "svelte-use-form";
	import { passwordMatch, containNumbers } from "./customValidators";
    import { sendForm } from "./sendForm";
    import { onMount } from "svelte";
	
	const form = useForm();
	const requiredMessage = "To pole jest wymagane!";

    let json = {username: '', password: '', email: ''};
	let csrfToken = '';

	onMount(async () => {
		const response = await fetch('http://127.0.0.1:8000/get_csrf_token/');
		const data = await response.json();
		csrfToken = data.csrftoken;
	});
</script>
<main>
	<form use:form>
		<h1>
			Rejestracja
		</h1>
		<label for="email">Email</label>
		<input type="email" name="email" use:validators={[required, email]} bind:value={json.email} />
		<HintGroup for="email">
			<Hint on="required">{requiredMessage}</Hint>
			<Hint on="email" hideWhenRequired>Niepoprawny mail</Hint>	
		</HintGroup>

		<label for="name">Nazwa użytkownika</label>
		<input type="text" name="name" bind:value={json.username} />

		<label for="password">Hasło</label>
		<input type="password" name="password" use:validators={[required, minLength(5), containNumbers(2)]}
        bind:value={json.password} />
		<HintGroup for="password">
			<Hint on="required">{requiredMessage}</Hint>
			<Hint on="minLength" hideWhenRequired let:value>To pole musi zawierać przynajmniej {value} znaków.</Hint>	
			<Hint on="containNumbers" hideWhen="minLength" let:value>
				To pole musi zawierać przynajmniej {value} cyfr.
			</Hint>	
		</HintGroup>

		<label for="passwordConfirmation">Potwierdź hasło</label>
		<input type="password" name="passwordConfirmation" use:validators={[required, passwordMatch]} />
		<HintGroup for="passwordConfirmation">
			<Hint on="required">{requiredMessage}</Hint>
			<Hint on="passwordMatch" hideWhenRequired>Hasło nie pasuje do poprzedniego</Hint>	
		</HintGroup><br />

		<button disabled={!$form.valid} on:click={() => sendForm(json, csrfToken)}>
			Wyślij
		</button>
	</form>
</main>
	

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
	
	main {
		display: flex;
		justify-content: space-around;
	}
</style>