import express from 'express'
import { json } from 'body-parser'
import { ExpressAdapter } from 'ask-sdk-express-adapter'
import {
	SkillBuilders,
	HandlerInput,
	RequestHandler,
	ErrorHandler,
} from 'ask-sdk-core'

const LaunchRequestHandler: RequestHandler = {
	canHandle(handlerInput: HandlerInput) {
		return handlerInput.requestEnvelope.request.type === 'LaunchRequest'
	},
	handle(handlerInput: HandlerInput) {
		const speechText = '¡Hola! Bienvenido a tu skill en TypeScript.'
		return handlerInput.responseBuilder
			.speak(speechText)
			.reprompt(speechText)
			.getResponse()
	},
}

const HelpIntentHandler: RequestHandler = {
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

const CustomErrorHandler: ErrorHandler = {
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

const skill = SkillBuilders.custom()
	.addRequestHandlers(LaunchRequestHandler, HelpIntentHandler)
	.addErrorHandlers(CustomErrorHandler)
	.create()

const app = express()
app.use(json())

const adapter = new ExpressAdapter(skill, true, true)
app.post('/', adapter.getRequestHandlers())

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`Servidor Alexa escuchando en http://localhost:${PORT}`)
})
