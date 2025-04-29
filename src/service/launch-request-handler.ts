import { HandlerInput, RequestHandler } from 'ask-sdk-core'

export const LaunchRequestHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
	},
	handle(handlerInput: HandlerInput) {
		const speechText = '¡Hola! Bienvenido a tu skill'
		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.getResponse()
	},
}
