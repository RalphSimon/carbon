import InteriorLeftNav from '../../src/components/interior-left-nav/interior-left-nav';
import InteriorLeftNavHtml from '../../html/interior-left-nav/interior-left-nav.html';
import KeepOpen from '../../html/interior-left-nav/interior-left-nav--keep-open.html';

describe('Test interior left nav', function() {
  describe('Constructor', function() {
    it('Should throw if root element is not given', function() {
      expect(() => {
        new InteriorLeftNav();
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });

    it('Should throw if root element is not a DOM element', function() {
      expect(() => {
        new InteriorLeftNav(document.createTextNode(''));
      }).toThrowError(TypeError, 'DOM element should be given to initialize this widget.');
    });
  });

  describe('hookListItemsEvents', function() {
    let container;
    let element;
    let instance;

    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = InteriorLeftNavHtml;
      document.body.appendChild(container);
      element = document.querySelector('[data-interior-left-nav]');
      instance = new InteriorLeftNav(element);
    });

    it('should be called', function() {
      spyOn(instance, 'hookListItemsEvents');
      instance.hookListItemsEvents();
      expect(instance.hookListItemsEvents).toHaveBeenCalled();
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });

  describe('keepOpen', function() {
    let container;
    let element;
    let instance1;
    let instance2;
    let instance3;

    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = InteriorLeftNavHtml;
      document.body.appendChild(container);
      element = document.querySelector('[data-interior-left-nav]');
    });

    it('Should have a default setting of false', function() {
      instance1 = new InteriorLeftNav(element);
      expect(instance1.options.keepOpen).toBe(false);
      document.body.removeChild(container);
      instance1.release();
    });

    it('Should accept an option in the constructor to override', function() {
      instance2 = new InteriorLeftNav(element, {
        keepOpen: true,
      });
      expect(instance2.options.keepOpen).toBe(true);
      document.body.removeChild(container);
      instance2.release();
    });

    it('Should read data-keep-open attribute in the markup to override', function() {
      document.body.removeChild(container);
      const container2 = document.createElement('div');
      container2.innerHTML = KeepOpen;
      document.body.appendChild(container2);
      element = document.querySelector('[data-interior-left-nav]');
      instance3 = new InteriorLeftNav(element);
      expect(instance3.keepOpen).toBe(true);
      document.body.removeChild(container2);
      instance3.release();
    });

    it('If true, should not remove expanded class from other elements on second open', function() {
      document.body.removeChild(container);
      const container2 = document.createElement('div');
      container2.innerHTML = KeepOpen;
      document.body.appendChild(container2);
      element = document.querySelector('[data-interior-left-nav]');
      instance3 = new InteriorLeftNav(element);

      const nested = document.querySelectorAll('.left-nav-list__item--has-children');

      for (let i = 0; i < nested.length; i += 1) {
        nested[i].dispatchEvent(new CustomEvent('click', { bubbles: true }));
      }

      const expanded = document.querySelectorAll('.left-nav-list__item--expanded');
      expect(expanded.length).toBe(nested.length);
    });
  });

  describe('addActiveListItem', function() {
    let container;
    let element;
    let instance;

    beforeEach(function() {
      container = document.createElement('div');
      container.innerHTML = InteriorLeftNavHtml;
      document.body.appendChild(container);
      element = document.querySelector('[data-interior-left-nav]');
      instance = new InteriorLeftNav(element);
    });

    it('should be called', function() {
      const item = document.querySelector(instance.options.selectorLeftNavListItem);
      spyOn(instance, 'addActiveListItem');
      instance.addActiveListItem(item);
      expect(instance.addActiveListItem).toHaveBeenCalled();
    });

    afterEach(function() {
      instance.release();
      document.body.removeChild(container);
    });
  });
});