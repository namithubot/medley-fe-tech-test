/**
 * Model to denote a pagination metadata object.
 */
export interface PaginationMeta {
	/**
	 * Current Page number
	 */
	page: number;

	/**
	 * Page size allowed.
	 */
	limit: number;

	/**
	 * Total number of entries.
	 */
	totalCount: number;
}
