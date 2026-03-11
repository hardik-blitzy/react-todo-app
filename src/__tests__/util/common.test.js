import React from 'react';
import { objectWithOnly, wrapChildrenWith, stringInclues } from '../../util/common';

describe('objectWithOnly', function () {

    it('returns object with only specified attributes', function () {
        var source = {
            foo: function () { return 'foo'; },
            bar: function () { return 'bar'; },
            baz: function () { return 'baz'; }
        };

        var result = objectWithOnly(source, ['foo', 'bar']);

        expect(result.foo).toBeDefined();
        expect(result.bar).toBeDefined();
        expect(result.baz).toBeUndefined();
    });

    it('extracted methods are bound to the original object', function () {
        function Counter() {
            this.count = 0;
        }
        Counter.prototype.increment = function () {
            this.count++;
        };
        Counter.prototype.getCount = function () {
            return this.count;
        };

        var instance = new Counter();
        var result = objectWithOnly(instance, ['increment', 'getCount']);

        // Call extracted methods without explicit binding
        result.increment();
        result.increment();

        // Verify the extracted getCount reflects updated state
        expect(result.getCount()).toBe(2);

        // Verify the original object's state was mutated (proving binding)
        expect(instance.count).toBe(2);
    });

    it('attributes not in the attrs array are excluded', function () {
        var source = {
            a: function () { return 'a'; },
            b: function () { return 'b'; },
            c: function () { return 'c'; }
        };

        var result = objectWithOnly(source, ['a']);

        expect(Object.keys(result)).toEqual(['a']);
        expect(Object.keys(result).length).toBe(1);
        expect(result.a).toBeDefined();
        expect(result.b).toBeUndefined();
        expect(result.c).toBeUndefined();
    });

    it('works with plain objects that have methods', function () {
        var value = 10;
        var plainObj = {
            getValue: function () { return value; },
            double: function () { value *= 2; }
        };

        var result = objectWithOnly(plainObj, ['getValue', 'double']);

        expect(typeof result.getValue).toBe('function');
        expect(typeof result.double).toBe('function');

        expect(result.getValue()).toBe(10);
        result.double();
        expect(result.getValue()).toBe(20);
    });

});

describe('wrapChildrenWith', function () {

    it('wraps a single React child element with additional props', function () {
        var child = React.createElement('div', { id: 'test' });

        var result = wrapChildrenWith(child, { className: 'wrapped' });

        // React.Children.map returns an array even for a single child
        expect(Array.isArray(result)).toBe(true);
        expect(result.length).toBe(1);

        // The cloned element should have both original and new props
        expect(result[0].props.id).toBe('test');
        expect(result[0].props.className).toBe('wrapped');
    });

    it('wraps multiple React children with additional props', function () {
        var children = [
            React.createElement('div', { key: '1' }),
            React.createElement('span', { key: '2' })
        ];

        var result = wrapChildrenWith(children, { 'data-test': true });

        expect(result.length).toBe(2);
        expect(result[0].props['data-test']).toBe(true);
        expect(result[1].props['data-test']).toBe(true);

        // Verify element types are preserved
        expect(result[0].type).toBe('div');
        expect(result[1].type).toBe('span');
    });

    it('preserves existing child props while merging new ones', function () {
        var child = React.createElement('div', {
            id: 'original',
            className: 'existing'
        });

        var result = wrapChildrenWith(child, {
            className: 'new',
            'data-extra': 'value'
        });

        // Original prop id should be preserved
        expect(result[0].props.id).toBe('original');

        // className is overridden by cloneElement's merge behavior
        expect(result[0].props.className).toBe('new');

        // New prop should be present
        expect(result[0].props['data-extra']).toBe('value');

        // Verify the cloned element is not the same reference as the original
        expect(result[0]).not.toBe(child);
    });

});

describe('stringInclues', function () {

    it('returns true when substring is present', function () {
        expect(stringInclues('hello world', 'world')).toBe(true);
    });

    it('returns false when substring is absent', function () {
        expect(stringInclues('hello world', 'xyz')).toBe(false);
    });

    it('returns true for empty substring', function () {
        // 'hello'.indexOf('') === 0, which is !== -1, so returns true
        expect(stringInclues('hello', '')).toBe(true);
    });

    it('returns true for exact match', function () {
        expect(stringInclues('hello', 'hello')).toBe(true);
    });

    it('handles empty string with empty substring', function () {
        // ''.indexOf('') === 0, which is !== -1, so returns true
        expect(stringInclues('', '')).toBe(true);
    });

    it('returns false for empty string with non-empty substring', function () {
        expect(stringInclues('', 'hello')).toBe(false);
    });

});
