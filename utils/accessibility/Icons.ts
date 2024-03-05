export class Icons {

    private map: Map<string, string>;

    constructor() {
        //WCAG 2.0 Level A & AA Rules
        this.map = new Map();
        this.map.set('area-alt', 'image_search');
        this.map.set('aria-allowed-attr', 'rule');
        this.map.set('aria-command-name', 'auto_label');
        this.map.set('aria-hidden-body', 'frame_inspect');
        this.map.set('aria-hidden-focus', 'filter_center_focus');
        this.map.set('aria-input-field-name', 'label_off');
        this.map.set('aria-meter-name', 'battery_horiz_050');
        this.map.set('aria-progressbar-name', 'hourglass_top');
        this.map.set('aria-required-attr', 'emergency');
        this.map.set('aria-required-children', 'account_tree');
        this.map.set('aria-required-parent', 'supervisor_account');
        this.map.set('aria-roles', 'table_chart');
        this.map.set('aria-toggle-field-name', 'toggle_off');
        this.map.set('aria-tooltip-name', 'tooltip');
        this.map.set('aria-valid-attr-value', 'fact_check');
        this.map.set('aria-valid-attr', 'task_alt');
        this.map.set('blink', 'animation');
        this.map.set('button-name', 'smart_button');
        this.map.set('bypass', 'flex_direction');
        this.map.set('color-contrast', 'contrast');
        this.map.set('dlitem', 'clear_all');
        this.map.set('document-title', 'title');
        this.map.set('duplicate-id-active', 'control_point_duplicate');
        this.map.set('duplicate-id-aria', 'edit_attributes');
        this.map.set('duplicate-id', 'content_copy');
        this.map.set('form-field-multiple-labels', 'dynamic_form');
        this.map.set('frame-focusable-content', 'iframe_off');
        this.map.set('frame-title-unique', 'iframe');
        this.map.set('frame-title', 'pip_exit');
        this.map.set('html-has-lang', 'language');
        this.map.set('html-lang-valid', 'translate');
        this.map.set('html-xml-lang-mismatch', 'language_korean_latin');
        this.map.set('image-alt', 'mms');
        this.map.set('input-button-name', 'buttons_alt');
        this.map.set('input-image-alt', 'smart_button');
        this.map.set('label', 'label');
        this.map.set('link-in-text-block', 'text_snippet');
        this.map.set('link-name', 'more');
        this.map.set('list', 'list');
        this.map.set('listitem', 'tv_options_edit_channels');
        this.map.set('marquee', 'motion_blur');
        this.map.set('meta-refresh', 'replay_30');
        this.map.set('meta-viewport', 'zoom_in');
        this.map.set('nested-interactive', 'tab_close_right');
        this.map.set('no-autoplay-audio', 'autoplay');
        this.map.set('object-alt', 'data_object');
        this.map.set('role-img-alt', 'add_photo_alternate');
        this.map.set('scrollable-region-focusable', 'gesture_select');
        this.map.set('select-name', 'credit_score');
        this.map.set('server-side-image-map', 'smb_share');
        this.map.set('svg-img-alt', 'imagesmode');
        this.map.set('td-headers-attr', 'table');
        this.map.set('th-has-data-cells', 'table_view');
        this.map.set('valid_lang', 'captive_portal');
        this.map.set('video-caption', 'closed_caption_disabled');
        //WCAG 2.1 Level A & AA Rules
        this.map.set('autocomplete-valid', 'fact_check');
        this.map.set('avoid-inline-spacing', 'density_medium');
        //WCAG 2.2 Level A & AA Rules
        this.map.set('target-size', 'touch_app');
        //Best Practices Rules
        this.map.set('accesskeys', 'keyboard_previous_language');
        this.map.set('aria-allowed-role', 'space_dashboard');
        this.map.set('aria-dialog-name', 'domain_verification');
        this.map.set('aria-text', 'grading');
        this.map.set('aria-treeitem-name', 'account_tree');
        this.map.set('empty-heading', 'subheader');
        this.map.set('empty-table-header', 'table_rows_narrow');
        this.map.set('frame-tested', 'add_to_queue');
        this.map.set('heading-order', 'format_h2');
        this.map.set('image-redundant-alt', 'altitude');
        this.map.set('label-title-only', 'new_label');
        this.map.set('landmark-banner-is-top-level', 'toolbar');
        this.map.set('landmark-complementary-is-top-level', 'dock_to_right');
        this.map.set('landmark-contentinfo-is-top-level', 'bottom_navigation');
        this.map.set('landmark-main-is-top-level', 'web_asset');
        this.map.set('landmark-no-duplicate-banner', 'tab_duplicate');
        this.map.set('landmark-no-duplicate-contentinfo', 'toast');
        this.map.set('landmark-no-duplicate-main', 'domain_verification_off');
        this.map.set('landmark-one-main', 'developer_board_off');
        this.map.set('landmark-unique', 'select_window_off');
        this.map.set('meta-viewport-large', 'monitor_weight_gain');
        this.map.set('page-has-heading-one', 'format_h1');
        this.map.set('presentation-role-conflict', 'co_present');
        this.map.set('region', 'schema');
        this.map.set('scope-attr-valid', 'production_quantity_limits');
        this.map.set('skip-link', 'tag');
        this.map.set('tabindex', 'format_list_numbered');
        this.map.set('table-duplicate-name', 'backup_table');
        //WCAG 2.x level AAA rules
        this.map.set('color-contrast-enhanced', 'flaky');
        this.map.set('identical-links-same-purpose', 'add_link');
        this.map.set('meta-refresh-no-exceptions', 'replay_10');
    }

    /**
     * Get icon by rule
     * @param {string} rule Rule
     * @returns Material icon for the rule or ''
     */
    getIcon(rule: string) {
        return this.map.get(rule) ?? '';
    }

}
