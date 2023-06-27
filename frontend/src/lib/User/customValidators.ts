import type { Form } from "svelte-use-form/dist/ts/models/form";
import type { Validator } from "svelte-use-form/dist/ts/models/validator";

export function passwordMatch(value: string, form: Form): Object {
	if (value !== form.values.password) {
			return { passwordMatch: true };
	}
}

export function containNumbers(numbers: number): Validator {
	return function(value: string): Object {
		if (value.replace(/[^0-9]/g,"").length < numbers) {
			return { containNumbers: numbers };
		}
	}
}