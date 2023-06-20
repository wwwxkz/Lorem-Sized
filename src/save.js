/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';
import apiFetch from '@wordpress/api-fetch';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */

 export async function save( { attributes } ) {
    const blockProps = useBlockProps.save();
	
	const searchPostsByTitle = async (title) => {
		try {
			const start = Date.now();
		  	const response = await apiFetch( { path: `/wp/v2/posts?search=${encodeURIComponent(title)}` } );
			console.log( 'The request took ' + ( Date.now() - start ) + 'ms' );
		  	return response;
		} catch (error) {
		  	console.error(error);
		  	return null;
		}
	  };

	const searchResult = await searchPostsByTitle(attributes.message);

	return <div { ...blockProps }><pre>{ JSON.stringify(searchResult) }</pre></div>;
}

export default save;