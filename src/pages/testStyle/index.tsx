import React, { useEffect } from 'react';
import EditTable from './editTable';
import VirtualTables from './virtualTable';
import UploadTest from './uploadTest';

// use css 没有作用域 互相影响
import './index.css';

// less内置 cssModule 推荐
import styles from './index.less';
import { upload } from '@/services';

// tailwindcss内置 可以直接使用微生成器
// umi g tailwindcss
export default () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect(() => {
		fetch('/api/users').then((res) => {
			console.log('res-->', res);
		});
	});

	useEffect(() => {
		// test
		let params = {
			chunkNumber: 0,
			chunkSize: 0,
			currentChunkSize: 0,
			totalSize: 0,
			identifier: '',
			filename: '',
			relativePath: '',
			totalChunks: 0,
			File: {},
			FileHeader: {
				Filename: '',
				Header: {},
				Size: 0,
			},
		};
		upload(params)
			.then((res) => {
				console.log('res', res);
			})
			.catch((err) => {
				throw new Error(err);
			});
	});
	return (
		<>
			<UploadTest />
			<div className="cssBlock"></div>
			<div className={styles.parent}>
				<div className={styles.child}></div>
			</div>
			<div className="bg-red-300 w-5 h-5"></div>
			<EditTable />
			<VirtualTables />
		</>
	);
};
