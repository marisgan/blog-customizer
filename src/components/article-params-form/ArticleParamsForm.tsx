import { useState } from 'react';
import clsx from 'clsx';

import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);
	const onClick = () => setIsOpen((prev) => !prev);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={onClick} />
			{isOpen && (
				<aside
					className={clsx(styles.container, {
						[styles.container_open]: isOpen,
					})}>
					<form className={styles.form}>
						<Text weight={800} size={31} uppercase>
							задайте параметры
						</Text>
						<Select
							selected={fontFamilyOptions[0]}
							options={fontFamilyOptions}
							title={'шрифт'}
						/>
						<RadioGroup
							name='--font-size'
							options={fontSizeOptions}
							selected={fontSizeOptions[0]}
							title={'размер шрифта'}
						/>
						<Select
							selected={fontColors[0]}
							options={fontColors}
							title={'цвет шрифта'}
						/>
						<Separator />
						<Select
							selected={backgroundColors[0]}
							options={backgroundColors}
							title={'цвет фона'}
						/>
						<Select
							selected={contentWidthArr[0]}
							options={contentWidthArr}
							title={'ширина контента'}
						/>
						<div className={styles.bottomContainer}>
							<Button title='Сбросить' htmlType='reset' type='clear' />
							<Button title='Применить' htmlType='submit' type='apply' />
						</div>
					</form>
				</aside>
			)}
		</>
	);
};
