import React, { useState, useEffect } from "react";
import { Filter, Title, TagList, Tag, Button } from "./FilterTagsElements";
import tagsData from "./tagsData.json";

function FilterTags(props) {
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        props.onChange(selectedTags);
    }, [selectedTags]);

    const handleTagClick = (value) => {
        if (selectedTags.includes(value)) {
            setSelectedTags(selectedTags.filter((tag) => tag !== value));
        } else {
            setSelectedTags([...selectedTags, value]);
        }
    };

    return (
        <Filter>
            <Title>Filtros:</Title>
            <TagList>
                {tagsData.filters.map((tag, index) => (
                    <Tag key={index}>
                        <Button
                            type="button"
                            className={`option ${selectedTags.includes(tag.value) ? "selected" : ""}`}
                            onClick={() => handleTagClick(tag.value)}>{tag.label}
                        </Button>
                    </Tag>
                ))}
            </TagList>
        </Filter>
    );
}

export default FilterTags;
