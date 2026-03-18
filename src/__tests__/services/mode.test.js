import { getNextModeByKey, MODE_NONE, MODE_SEARCH, MODE_CREATE } from '../../services/mode';
import { KEY_SLASH, KEY_N, KEY_ESCAPE, KEY_RETURN } from 'keycode-js';

describe('mode constants', () => {
    it('MODE_NONE should equal "none"', () => {
        expect(MODE_NONE).toBe('none');
    });

    it('MODE_SEARCH should equal "search"', () => {
        expect(MODE_SEARCH).toBe('search');
    });

    it('MODE_CREATE should equal "create"', () => {
        expect(MODE_CREATE).toBe('create');
    });
});

describe('getNextModeByKey', () => {
    describe('from MODE_NONE', () => {
        it('should transition to MODE_SEARCH when KEY_SLASH is pressed', () => {
            expect(getNextModeByKey(MODE_NONE, KEY_SLASH)).toBe(MODE_SEARCH);
        });

        it('should transition to MODE_CREATE when KEY_N is pressed', () => {
            expect(getNextModeByKey(MODE_NONE, KEY_N)).toBe(MODE_CREATE);
        });

        it('should remain MODE_NONE when an unrecognized key is pressed', () => {
            expect(getNextModeByKey(MODE_NONE, KEY_RETURN)).toBe(MODE_NONE);
        });

        it('should remain MODE_NONE when KEY_ESCAPE is pressed', () => {
            expect(getNextModeByKey(MODE_NONE, KEY_ESCAPE)).toBe(MODE_NONE);
        });
    });

    describe('from MODE_SEARCH', () => {
        it('should transition to MODE_NONE when KEY_ESCAPE is pressed', () => {
            expect(getNextModeByKey(MODE_SEARCH, KEY_ESCAPE)).toBe(MODE_NONE);
        });

        it('should remain MODE_SEARCH when KEY_SLASH is pressed', () => {
            expect(getNextModeByKey(MODE_SEARCH, KEY_SLASH)).toBe(MODE_SEARCH);
        });

        it('should remain MODE_SEARCH when KEY_N is pressed', () => {
            expect(getNextModeByKey(MODE_SEARCH, KEY_N)).toBe(MODE_SEARCH);
        });

        it('should remain MODE_SEARCH when KEY_RETURN is pressed', () => {
            expect(getNextModeByKey(MODE_SEARCH, KEY_RETURN)).toBe(MODE_SEARCH);
        });
    });

    describe('from MODE_CREATE', () => {
        it('should transition to MODE_NONE when KEY_ESCAPE is pressed', () => {
            expect(getNextModeByKey(MODE_CREATE, KEY_ESCAPE)).toBe(MODE_NONE);
        });

        it('should remain MODE_CREATE when KEY_SLASH is pressed', () => {
            expect(getNextModeByKey(MODE_CREATE, KEY_SLASH)).toBe(MODE_CREATE);
        });

        it('should remain MODE_CREATE when KEY_N is pressed', () => {
            expect(getNextModeByKey(MODE_CREATE, KEY_N)).toBe(MODE_CREATE);
        });

        it('should remain MODE_CREATE when KEY_RETURN is pressed', () => {
            expect(getNextModeByKey(MODE_CREATE, KEY_RETURN)).toBe(MODE_CREATE);
        });
    });
});
