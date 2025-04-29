import { HandlerInput, RequestHandler } from 'ask-sdk-core'

export const HelpIntentHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput) {
		return (
			handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
			handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
		)
	},
	handle(handlerInput: HandlerInput) {
		const speechText = 'Puedes pedirme que diga hola. ¿Cómo te puedo ayudar?'

		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.getResponse()
	},
}
