import { REGEX_EDITS } from './browser-storage';
import StorageWrapper, { DataModels } from './wrapper';
import * as BrowserStorage from './browser-storage';
import { RegexEdit } from '@/util/regex';
import RegexEditsModel from './regex-edits.model';

type K = typeof REGEX_EDITS;
type V = DataModels[K];
type T = Record<K, V>;

class RegexEditsImpl extends RegexEditsModel {
	private regexEditStorage = this.getStorage();

	constructor() {
		super(BrowserStorage.getLocalStorage(BrowserStorage.REGEX_EDITS));

		/* @ifdef DEBUG */
		void this.regexEditStorage.debugLog();
		/* @endif */
	}

	/** @override */
	async getRegexEditStorage(): Promise<RegexEdit[] | null> {
		return this.regexEditStorage.get();
	}

	/** @override */
	async saveRegexEditToStorage(data: T[K]): Promise<void> {
		return await this.regexEditStorage.set(data);
	}

	/** @override */
	getStorage(): StorageWrapper<K> {
		return BrowserStorage.getStorage(BrowserStorage.REGEX_EDITS);
	}
}

export default new RegexEditsImpl();
