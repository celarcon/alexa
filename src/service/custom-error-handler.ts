import { ErrorHandler } from 'ask-sdk-core'

export const CustomErrorHandler: ErrorHandler = {
	canHandle() {
		return true
	},
	handle(handlerInput, error) {
		console.error(`Error: ${error.message}`)
		return handlerInput.responseBuilder
			.speak('Lo siento, ha ocurrido un error inesperado.')
			.getResponse()
	},
}
