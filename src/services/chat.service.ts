import { franc } from 'franc'
import nlp from 'compromise'
import { PROJECT_KEYWORDS } from '../data/project-keywords.data'

export class LanguageDetectionService {
	detectLanguage(text: string, locale: string): 'en' | 'uk' {
		if (text.length < 3) return locale as 'en' | 'uk'
		try {
			const lang = franc(text, { only: ['eng', 'ukr'], minLength: 3 })
			return lang === 'und'
				? (locale as 'en' | 'uk')
				: lang === 'eng'
				? 'en'
				: 'uk'
		} catch (error) {
			console.error('Error detecting language:', error)
			return locale as 'en' | 'uk'
		}
	}
}

export class MessageParsingService {
	private projectKeywords = PROJECT_KEYWORDS

	parseMessage(input: string): {
		matchedProject: string | null
		isExperienceQuery: boolean
		isTechnologyQuery: boolean
	} {
		const doc = nlp(input.toLowerCase())

		let matchedProject: string | null = null
		for (const [project, keywords] of Object.entries(this.projectKeywords)) {
			if (keywords.some(keyword => doc.has(keyword))) {
				matchedProject = project
				break
			}
		}

		const isExperienceQuery =
			doc.has('experience') ||
			doc.has('досвід') ||
			doc.has('навич') ||
			doc.has('вмін')
		const isTechnologyQuery =
			doc.has('technolog') ||
			doc.has('технолог') ||
			doc.has('skill') ||
			doc.has('скіл')

		return {
			matchedProject,
			isExperienceQuery,
			isTechnologyQuery,
		}
	}
}

export class ResponseGeneratorService {
	generateResponse(
		parseResult: {
			matchedProject: string | null
			isExperienceQuery: boolean
			isTechnologyQuery: boolean
		},
		translator: any
	): string {
		const { matchedProject, isExperienceQuery, isTechnologyQuery } = parseResult

		if (matchedProject) {
			return translator(`projects.${matchedProject}`)
		} else if (isExperienceQuery) {
			return translator('projects.experience')
		} else if (isTechnologyQuery) {
			return translator('projects.technologies')
		} else {
			const randomIndex = Math.floor(
				Math.random() * (translator.raw('unknown')?.length || 1)
			)
			return translator(`unknown.${randomIndex}`)
		}
	}
}

export class LocalStorageService {
	saveMessages(messages: any[]): void {
		if (typeof window !== 'undefined') {
			localStorage.setItem('chatbotMessages', JSON.stringify(messages))
		}
	}

	loadMessages(): any[] | null {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('chatbotMessages')
			return saved ? JSON.parse(saved) : null
		}
		return null
	}

	clearMessages(): void {
		if (typeof window !== 'undefined') {
			localStorage.removeItem('chatbotMessages')
		}
	}
}
