# Fine-tuning

Learn how to customize a model for your application.

## Introduction

Fine-tuning lets users get more out of the models available through the API by providing:

1. Higher quality results than prompt design
2. Ability to train on more examples than can fit in a prompt
3. Token savings due to shorter prompts
4. Lower latency requests

GPT-3 has been pre-trained on a vast amount of text from the open internet. When given a prompt with just a few examples, it can often intuit what task the user is trying to perform and generate a plausible completion. This is often called "few-shot learning."

Fine-tuning improves on few-shot learning by training on many more examples than can fit in the prompt, letting users achieve better results on a wide number of tasks. Once a model has been fine-tuned, users won't need to provide examples in the prompt anymore. This saves costs and enables lower-latency requests.

At a high level, fine-tuning involves the following steps:

1. Prepare and upload training data
2. Train a new fine-tuned model
3. Use the fine-tuned model

Users can visit the pricing page to learn more about how fine-tuned model training and usage are billed.

## General Best Practices Summary

Fine-tuning works better with more high-quality examples, and performance improves linearly with every doubling of the number of examples. Providing at least a few hundred high-quality examples vetted by human experts is recommended.

For classification problems, the "ada" model is recommended as it performs well, while being faster and cheaper than more capable models.

When using a pre-existing dataset, it is crucial to review the data manually for offensive or inaccurate content, or review as many random samples as possible if the dataset is large.

### Additional Information 1

To ensure high-quality examples, consider the following:

- Avoid ambiguous or unclear examples, as they might confuse the model during training.
- Make sure the examples represent the real-world use cases the user wants the model to handle.
- Balance the dataset to avoid introducing biases, by ensuring equal representation of different classes or categories.
- Consider augmenting the dataset with additional examples, either by generating new ones or using data augmentation techniques.

#### Model Selection for Different Tasks

While "ada" is recommended for classification tasks, there are other models like "babbage", "curie", and "davinci" that may perform better in different scenarios.

Depending on the complexity of the task and the amount of computational resources available, users may want to experiment with different models to find the best fit.

#### Data Review and Preprocessing

Data preprocessing is a crucial step to ensure that the dataset is suitable for training. This includes cleaning the data, removing duplicates, and addressing any inconsistencies.

In addition to removing offensive or inaccurate content, consider using techniques like tokenization, stemming, or lemmatization to normalize text data.

Split the dataset into training, validation, and test sets to monitor the model's performance and prevent overfitting.

Assess the quality of the dataset by analyzing the distribution of classes, the presence of outliers, or any potential biases.

By following these best practices and expanding their understanding of the fine-tuning process, users will be better equipped to create high-performing models that suit their specific needs.

## Summary 1

1. Fine-tuning can solve various problems, and the optimal approach depends on the specific use case.
2. Before fine-tuning, users should prepare the dataset by following best practices and specific guidelines for their use case.
3. Data formatting for fine-tuning requires single input-output pairs (prompts and completions) rather than detailed instructions or multiple examples.
4. A fixed separator (e.g., \n\n###\n\n) should be used to mark the end of prompts and the beginning of completions.
5. Each completion should start with a whitespace due to tokenization.
6. A fixed stop sequence (e.g., \n, ###) should be used to mark the end of completions.
7. Prompts should be formatted during inference the same way as during training, including separators and stop sequences.

### Additional Information 2

1. Data Formatting Considerations:

   - Consistency in formatting across the entire dataset should be maintained, as inconsistencies may confuse the model and impact its performance.
   - A unique separator and stop sequence that do not appear in the dataset should be chosen to avoid confusing the model during training.

2. Data Collection and Organization:

   - Depending on the use case, users should consider creating a dataset from scratch or using existing datasets and adapting them to their needs.
   - The dataset should be organized into a structured format, such as JSON or CSV, to facilitate data processing and model training.

3. Fine-tuning for Specific Tasks:

   - For tasks like classification, users should consider formatting the dataset with the prompt containing the input text and the completion containing the label.
   - For tasks like question-answering, users should provide context in the prompt, followed by a question, and have the completion contain the answer.
   - For tasks like text generation, prompts should be formatted as partial texts, and completions as the desired continuation of the text.

4. Inference and Deployment:
   - The model should be fed with prompts formatted similarly to those during training to maintain consistency and achieve the expected output.
   - Users should monitor the model's performance and adjust hyperparameters or fine-tuning strategies as needed to improve its performance.
   - The fine-tuned model should be tested on a separate set of data to evaluate its generalization capabilities.

By understanding these specific guidelines and following the additional information provided, users will be better prepared to fine-tune models for various tasks and ensure optimal results.

## Summary 2

In classification problems, inputs are classified into predefined classes.
To format the dataset for classification, use a separator (e.g., \n\n###\n\n) at the end of the prompt and during inference.
Choose classes that map to a single token and set max_tokens=1 during inference.
Ensure the prompt and completion do not exceed 2048 tokens, including the separator.
Aim for at least ~100 examples per class.
To get class log probabilities, specify logprobs=5 for five classes when using the model.
Ensure the fine-tuning dataset closely resembles the structure and type of task the model will be used for.

### Additional Information 3

Creating Classification Datasets:

- Use clear and concise class labels that can be easily understood by the model.
- Balance the dataset by including a similar number of examples for each class to prevent the model from favoring one class over another.
- Consider using stratified sampling when splitting the dataset into training, validation, and testing sets to maintain class distribution across all sets.

Model Training and Evaluation:

- Monitor the model's performance using metrics like accuracy, precision, recall, and F1-score, which can help identify potential issues with class imbalance or model overfitting.
- Fine-tune the model on a validation set and test its performance on a separate test set to evaluate its generalization capabilities.
- Experiment with different hyperparameters, such as learning rate or batch size, to optimize the model's performance.

Handling Edge Cases and Ambiguous Inputs:

- Ensure the dataset contains examples that cover edge cases and ambiguous scenarios to help the model learn to handle them during inference.
- Consider incorporating error analysis and model interpretability techniques, such as feature importance or attention visualization, to better understand the model's decision-making process and identify areas for improvement.

By following these guidelines and considering the additional information provided, users will be better equipped to create, fine-tune, and deploy classification models that achieve optimal performance.

## Case study: Creating a classifier to filter out incorrect ads

The case study focuses on creating a classifier that filters out incorrect ads by checking if the ad mentions the correct product and company. The dataset uses structured input containing the company name, product, and associated ad, with a separator (\nSupported:) to differentiate the prompt from the completion. The "ada" model is chosen for fine-tuning due to its speed, cost-effectiveness, and comparable performance for classification tasks. Completion requests are made with the fine-tuned model, returning either "yes" or "no" based on whether the ad is accurate.

### Additional information 4

#### Data collection and quality

- Collect a diverse set of examples covering various industries, products, and companies to help the model generalize well across different ad scenarios.
- Ensure the dataset is of high quality, containing accurate information and correctly labeled examples to avoid misleading the model during fine-tuning.

#### Model evaluation and deployment

- Evaluate the model's performance using relevant metrics, such as accuracy and F1-score, to ensure it can effectively identify incorrect ads.
- Use the model in a real-world scenario, integrating it into your website's ad filtering system to automatically check and flag inaccurate ads.

#### Handling false positives and negatives

- To minimize false positives (incorrectly flagging accurate ads) and false negatives (failing to flag inaccurate ads), consider incorporating additional features into the model, such as context or historical data.
- Perform periodic manual reviews of flagged ads to confirm the model's decisions and fine-tune the model as needed to address any identified issues.

By following these guidelines and considering the additional information provided, you'll be better equipped to create and deploy a classifier that effectively filters out incorrect ads, ensuring the ads on your website mention the correct product and company.

## Case study: Sentiment analysis for tweets

The case study focuses on sentiment analysis, specifically determining whether a tweet is positive or negative. The dataset consists of tweet examples with their corresponding sentiment labels, either "positive" or "negative". After fine-tuning the model, log probabilities are used to determine the degree of sentiment, with higher probabilities for the "positive" class indicating a more positive sentiment. Completion requests are made with the fine-tuned model, returning either "positive" or "negative" based on the sentiment of the tweet.

### Additional information

#### Data collection and preprocessing

- Collect a diverse set of tweets from various sources, covering different topics and contexts, to improve the model's generalization capabilities.
- Preprocess the dataset to handle special characters, emojis, and links, as these elements can impact sentiment interpretation.

#### Handling neutral and mixed sentiments

- Consider incorporating a "neutral" class in the dataset to handle tweets that do not express a clear positive or negative sentiment.
- For tweets with mixed sentiments, decide whether to label them as positive, negative, or neutral, or introduce a separate class to handle such cases.

#### Model evaluation and deployment 2

- Evaluate the model's performance using relevant metrics, such as accuracy, precision, recall, and F1-score.
- Deploy the sentiment analysis model as part of a larger system, such as a social media monitoring tool, to provide valuable insights into public opinion about a brand, product, or topic.

#### Continuous improvement

- Continuously monitor the model's performance and gather new data as new trends and vocabulary emerge on social media platforms.
- Periodically fine-tune the model with updated data to ensure it remains accurate and relevant in the dynamic social media environment.

By following these guidelines and considering the additional information provided, you can create and deploy an effective sentiment analysis model for tweets, enabling you to gauge public opinion and better understand the sentiment around specific topics, brands, or products.

## Case Study: Email Triage

This case study is about email triage, which involves categorizing incoming emails into a large number of predefined categories. Categories are converted into numerical values, which works well for up to ~500 categories. The training data consists of email attributes and their corresponding numerical category labels. A separator, in this case "\n\n###\n\n", is used to differentiate the prompt and completion.

### Additional Information

#### Data Preprocessing and Feature Extraction

Clean the email data by removing irrelevant information, special characters, or formatting that may affect the model's performance. Extract relevant features from the email content, such as keywords, phrases, or entities, to better understand the context and help with categorization.

#### Handling Imbalanced Data

In real-world scenarios, some email categories may have significantly fewer examples than others, leading to imbalanced datasets. Techniques like oversampling, undersampling, or generating synthetic samples can help address this issue and improve the model's performance across all categories.

#### Model Evaluation and Deployment

Use metrics such as precision, recall, F1-score, and macro-averaged or weighted averages to evaluate the model's performance across all categories. Deploy the email triage model as part of an email management system, improving productivity by automatically categorizing emails and routing them to the appropriate department or individual.

#### Continuous Improvement

Regularly update the model with new data, as the types and categories of emails can change over time. Monitor the model's performance and adjust the categorization rules or fine-tune the model as needed to maintain high accuracy and efficiency.

By following these guidelines and considering the additional information provided, you can create an email triage system that effectively categorizes incoming emails into the appropriate categories, helping to streamline email management and improve productivity for organizations.

## Conditional Generation

Conditional generation involves generating content based on a given input.

### Guidelines

- Use a separator (e.g., "\n\n###\n\n") at the end of the prompt and an ending token (e.g., "END") for completions.
- Include the ending token as a stop sequence during inference.
- Aim for at least 500 high-quality examples with consistent formatting.
- Ensure the prompt + completion doesn't exceed 2048 tokens, including the separator.
- Use a similar dataset structure and task type during fine-tuning.
- Lower learning rates and 1-2 epochs are recommended for these use cases.

### Additional Information 4

1. Data Augmentation:

   - To increase the size of the dataset, use techniques like back-translation, synonym replacement, or sentence shuffling to help the model generalize better and improve performance.

2. Hyperparameter Tuning:

   - Experiment with different hyperparameters, such as learning rate schedules, batch sizes, or weight decay, to find the optimal configuration for your specific use case.

3. Model Evaluation:

   - Use appropriate evaluation metrics like BLEU, ROUGE, or METEOR scores for tasks like summarization or paraphrasing. For tasks like entity extraction, consider using precision, recall, and F1-score.

4. Model Ensemble:

   - Combine multiple models with different architectures or training setups to improve overall performance and robustness. Ensemble methods like majority voting, averaging, or stacking can be employed.

5. Post-processing:

   - Implement post-processing techniques like spell checking, grammar correction, or text simplification to improve the final output quality.

6. Monitoring and Updating:
   - Regularly monitor the model's performance and update the training data as needed to maintain high accuracy and efficiency. In addition, retrain the model with new examples to ensure it stays relevant to evolving requirements.

By considering the additional information provided, users can build effective conditional generation models that generate high-quality content based on given inputs and cater to a wide variety of use cases.

## Case Study: Entity Extraction

- Conditional generation involves generating content based on a given input.
- Use a separator (e.g., "\n\n###\n\n") at the end of the prompt and an ending token (e.g., "END") for completions.
- Include the ending token as a stop sequence during inference.
- Aim for at least 500 examples.
- Ensure the prompt + completion doesn't exceed 2048 tokens, including the separator.
- Use high-quality examples with consistent formatting.
- Use a similar dataset structure and task type during fine-tuning.
- Lower learning rates and 1-2 epochs are recommended for these use cases.

### Additional Information 5

1. Data Augmentation:

   - Use techniques like back-translation, synonym replacement, or sentence shuffling to increase the size of the dataset.
   - This helps the model generalize better and improves performance.

2. Hyperparameter Tuning:

   - Experiment with different hyperparameters, such as learning rate schedules, batch sizes, or weight decay, to find the optimal configuration for your specific use case.

3. Model Evaluation:

   - Use appropriate evaluation metrics like BLEU, ROUGE, or METEOR scores for tasks like summarization or paraphrasing.
   - For tasks like entity extraction, consider using precision, recall, and F1-score.

4. Model Ensemble:

   - Combine multiple models with different architectures or training setups to improve overall performance and robustness.
   - Ensemble methods like majority voting, averaging, or stacking can be employed.

5. Post-processing:

   - Implement post-processing techniques like spell checking, grammar correction, or text simplification to improve the final output quality.

6. Monitoring and Updating:

## Case Study: Customer Support Chatbot

A customer support chatbot involves context, summary, and specific information about the conversation. The dataset should include multiple rows for the same conversation, with each agent generation as a completion. Ensure high-quality conversation samples and consider using a separate text transformation model for generating summaries. Use a consistent format for customer-agent dialogs in prompts and completions.

### Additional Information 6

1. Context Management:

   - Efficiently manage the conversation context to provide accurate and meaningful responses. This may involve tracking user preferences, session information, and other relevant details.

2. Pre-built Intents and Entities:

   - Incorporate pre-built intents and entities from existing chatbot platforms or libraries to cover common conversational scenarios, reducing the effort required to create a comprehensive dataset.

3. Handling Out-of-scope Queries:

   - Train the chatbot to gracefully handle queries that are outside its domain of expertise, guiding users towards alternative solutions or resources.

4. Personalization:

   - Enhance the chatbot's conversational capabilities by incorporating personalized responses based on user behavior, preferences, and history.

5. Multilingual Support:

   - Expand the chatbot's reach by training it to understand and respond in multiple languages, catering to a diverse user base.

6. Conversational Flow:

   - Ensure the chatbot maintains a natural conversational flow and can manage complex interactions, such as multi-turn conversations, contextual understanding, and disambiguation.

7. Continuous Improvement:
   - Regularly analyze user interactions and feedback to identify areas of improvement and update the chatbot's training data accordingly.

Considering these additional aspects will help you create a more effective customer support chatbot, capable of handling various types of requests and providing high-quality responses to users.

## Advanced Usage: Customize Your Model Name

Users can customize their fine-tuned model name with a suffix of up to 40 characters. Additionally, analyzing the result files attached to each completed job can help monitor and evaluate model performance. These result files can be downloaded using the OpenAI CLI or CURL commands. The \_results.csv file contains information on each training step, such as elapsed_tokens, elapsed_examples, training_loss, training_sequence_accuracy, and training_token_accuracy.

### Additional Information 7

1. Customizing Model Names:

   - Using descriptive suffixes helps to easily distinguish between different fine-tuned models, especially when managing multiple models for various tasks or domains.

2. Monitoring Model Performance:

   - Analyzing the \_results.csv file enables users to track their model's performance during the fine-tuning process, identifying areas of improvement and making necessary adjustments to the training data or parameters.
   - Evaluating fine-tuning: Users can use the metrics provided in the results file to compare the performance of different fine-tuning runs, helping them decide which version of the fine-tuned model to use in their application.

3. Learning Rate Schedules and Optimization:

   - Observing the training_loss values in the results file can help infer how well the learning rate and optimization settings are working for the model. If the training loss doesn't decrease or fluctuates wildly, adjusting these parameters may be necessary.

4. Overfitting and Early Stopping:

   - Monitoring the training metrics, such as training_sequence_accuracy and training_token_accuracy, can help identify overfitting or the need for early stopping to prevent over-optimizing the model on the training data.

5. Data Quality and Model Improvement:
   - The insights provided by the results file can be used to assess the quality of training data and guide refinement of the dataset or model architecture for better performance.

By understanding these aspects, users can make informed decisions when fine-tuning their model and analyzing its performance, leading to a more efficient and effective AI solution.

## Classification Specific Metrics

To generate classification-specific metrics in the results file, set the `--compute_classification_metrics` parameter when creating the fine-tuning job. Additionally, provide a validation file and set either `classification_n_classes` or `classification_positive_class`, depending on whether it's multiclass or binary classification. You can use the OpenAI CLI commands to create the fine-tuning job with the appropriate settings.

### Additional Information 8

Importance of Classification-Specific Metrics:

- These metrics are useful for evaluating the performance of a fine-tuned model on classification tasks, providing insights on how well the model generalizes to new data and helping identify potential areas for improvement.

Validation Set:

- The validation set is used to compute these additional metrics, allowing you to track the model's performance on unseen data during the fine-tuning process. This helps ensure that your model isn't overfitting to the training data and provides a more accurate representation of its real-world performance.

Multiclass vs. Binary Classification:

- Depending on the nature of your classification task, you can set the appropriate parameters for multiclass or binary classification. In multiclass classification, you need to provide the total number of classes, while in binary classification, you should specify the positive class from your dataset.

Metrics Provided:

- The specific metrics that will be displayed in your results file when you enable classification-specific metrics were not mentioned in the text. However, typically, these metrics may include accuracy, precision, recall, F1 score, and confusion matrix, among others.

Understanding and monitoring these classification-specific metrics can help you fine-tune your model more effectively, leading to better performance in classification tasks and a more robust AI solution.

## Multiclass Classification

In the context of OpenAI fine-tuning, multiclass classification refers to a supervised learning task where the model must classify input data into one of multiple classes or categories. The objective of fine-tuning is to adapt a pre-trained language model to perform well on your specific classification task by adjusting its weights based on your training data.

To implement multiclass classification using OpenAI fine-tuning, you need to:

1. Prepare your training and validation datasets: Ensure that your dataset contains examples of all the classes you want your model to classify. The dataset should be balanced, meaning it has a roughly equal number of examples for each class to prevent bias towards any particular class.

2. Convert class labels to numerical format: Since GPT-based models are more adept at handling numbers than categorical data, convert your class labels into numerical values. This will make it easier for the model to learn and predict the correct class during the fine-tuning process.

3. Set up the fine-tuning job: Use the OpenAI CLI commands to create the fine-tuning job, specifying the training and validation datasets, model, and classification-related parameters. For multiclass classification, set the --classification_n_classes parameter to the total number of classes in your dataset.

4. Compute classification metrics: Enable the --compute_classification_metrics option to generate classification-specific metrics like accuracy and weighted F1 score in the results file. These metrics will help you evaluate the performance of your fine-tuned model on the multiclass classification task and identify areas for improvement.

5. Evaluate and iterate: Analyze the fine-tuning results and classification metrics to assess your model's performance. If the model doesn't meet your expectations, consider adjusting parameters such as learning rate, number of training epochs, or dataset quality.

6. Apply the fine-tuned model: Once satisfied with the performance, you can use the fine-tuned model to make predictions on new data in real-world applications. Remember to convert the numerical class predictions back to their original class labels for interpretation.

When working with multiclass classification, you can explore various possibilities, such as:

- Experimenting with different data preprocessing techniques, like text normalization or feature extraction, to improve model performance.
- Using different architectures or pre-trained models as a starting point for fine-tuning, depending on your specific problem and data.
- Implementing techniques like data augmentation, oversampling, or undersampling to address class imbalance issues.
- Combining multiple fine-tuned models in an ensemble to improve classification performance and robustness.

By understanding the intricacies of multiclass classification and fine-tuning, users can creatively apply these techniques to build more effective and accurate AI models for a wide range of applications.

I'll provide examples for both multiclass and binary classification using OpenAI fine-tuning in the context of real-life scenarios.

### Multiclass Classification Example: News Article Categorization

Imagine you have a collection of news articles and want to categorize them into different topics, such as sports, politics, technology, and entertainment. In this case, you'll have four classes (1: sports, 2: politics, 3: technology, 4: entertainment).

Prepare your training and validation datasets, ensuring that each class is well-represented with multiple examples. Format each example in a way that the model can understand, such as:

`{"prompt": "<news article content>", "completion": " 1"}`

Set up the fine-tuning job for multiclass classification using the OpenAI CLI commands:

```bash
openai api fine_tunes.create \
 -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_OR_PATH> \
 -m <MODEL> \
 --compute_classification_metrics \
 --classification_n_classes 4
```

Once fine-tuned, use the model to predict the category of new articles and interpret the results.

### Binary Classification Example: Sentiment Analysis

Suppose you want to perform sentiment analysis on product reviews to determine whether each review is positive or negative. In this case, you have two classes (0: negative, 1: positive).

Prepare your training and validation datasets, ensuring that both positive and negative examples are included. Format each example in a way that the model can understand, such as:

`{"prompt": "<product review content>", "completion": " 0"}`

Set up the fine-tuning job for binary classification using the OpenAI CLI commands:

```bash
openai api fine_tunes.create \
 -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_OR_PATH> \
 -m <MODEL> \
 --compute_classification_metrics \
 --classification_n_classes 2 \
 --classification_positive_class 1
```

After fine-tuning, use the model to predict the sentiment of new product reviews, and interpret the results.
Both examples demonstrate how to apply OpenAI fine-tuning to real-life scenarios for multiclass and binary classification tasks. By understanding the process and adapting it to various problems, you can creatively leverage fine-tuning for diverse applications.

I'll provide two concrete examples of using validation in real-life scenarios, demonstrating the benefits of validation for different applications.

### Example 1: Machine Translation

Suppose you are fine-tuning a model for translating English sentences into French. In this case, you need a dataset with pairs of English sentences and their corresponding French translations.

Prepare your dataset and split it into two parts: a training set and a validation set. The training set should contain the majority of examples (e.g., 80%), while the validation set should contain a smaller portion of the dataset (e.g., 20%). Make sure both sets contain diverse examples to avoid bias.

Format your examples as follows:

`{"prompt": "Translate the following English sentence to French: <English sentence>", "completion": " <French translation>"}`

Fine-tune your model using both the training and validation datasets:

```bash
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> \
  -v <VALIDATION_FILE_ID_OR_PATH> \
  -m <MODEL>
```

Analyze the validation metrics (e.g., validation_loss, validation_sequence_accuracy, and validation_token_accuracy) to assess the model's performance on unseen data and adjust the fine-tuning process if necessary.

### Example 2: Movie Genre Classification

Imagine you are developing a model to classify movie plots into different genres, such as action, drama, comedy, etc. You have a dataset containing movie plot summaries and their respective genres.

Split your dataset into a training set (e.g., 80% of the data) and a validation set (e.g., 20% of the data), ensuring both sets contain diverse examples representing all genres.

Format your examples as follows:

`{"prompt": "Determine the genre of the following movie plot: <movie plot summary>", "completion": " <genre>"}`

Fine-tune your model using both the training and validation datasets:

```bash
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> \
  -v <VALIDATION_FILE_ID_OR_PATH> \
  -m <MODEL>
```

Monitor the validation metrics (e.g., validation_loss, validation_sequence_accuracy, and validation_token_accuracy) to evaluate the model's performance on unseen data and adjust the fine-tuning process if needed.
In both examples, the validation set plays a crucial role in assessing the model's ability to generalize to new, unseen data. By monitoring the validation metrics, you can better understand if the model is overfitting the training data or if it's learning to make meaningful predictions on new data. This helps improve the model's performance and applicability in real-world scenarios.

Here are two concrete examples of using hyperparameters in real-life scenarios, demonstrating how tweaking hyperparameters can lead to better performance in different applications.

Example 1: Sentiment Analysis

Imagine you are fine-tuning a model to classify movie reviews as positive or negative. You have a dataset containing movie reviews and their corresponding sentiment labels.

Split your dataset into a training set (e.g., 80% of the data) and a validation set (e.g., 20% of the data), ensuring both sets contain diverse examples representing positive and negative sentiment.

Format your examples as follows:

`{"prompt": "Determine the sentiment of the following movie review: <movie review>", "completion": " <positive/negative>"}`

Fine-tune your model with the default hyperparameters and observe the results:

```bash
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_ID_OR_PATH> \
 -m <MODEL>
```

Fine-tune your model with different hyperparameters, such as increasing the number of epochs, adjusting the learning rate multiplier, and/or changing the batch size:

```bash
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_ID_OR_PATH> \
 -m <MODEL> \
 --n_epochs 8 \
 --learning_rate_multiplier 0.1 \
 --batch_size 128
```

Compare the results and choose the model with the best performance on the validation set.
Example 2: Text Summarization

Suppose you are developing a model to generate summaries of news articles. You have a dataset containing news articles and their respective summaries.

Split your dataset into a training set (e.g., 80% of the data) and a validation set (e.g., 20% of the data), ensuring both sets contain diverse examples representing various topics and article lengths.

Format your examples as follows:

`{"prompt": "Summarize the following news article: <news article>", "completion": " <summary>"}`

Fine-tune your model with the default hyperparameters and observe the results:

```bash
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_ID_OR_PATH> \
 -m <MODEL>
```

Fine-tune your model with different hyperparameters, such as using a different base model, increasing the number of epochs, or adjusting the batch size:

```bash
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_ID_OR_PATH> \
 -m curie \
 --n_epochs 6 \
 --batch_size 64
```

Compare the results and choose the model with the best performance on the validation set.
In both examples, adjusting the hyperparameters can lead to better performance. Tweaking hyperparameters such as the base model, number of epochs, batch size, and learning rate multiplier allows you to find the optimal configuration for your specific task. This helps improve the model's performance and applicability in real-world scenarios.

Continuing fine-tuning from a fine-tuned model is useful when you have new data to incorporate into an existing model without retraining it from scratch. This allows you to update the model with the latest data, potentially improving its performance or adapting it to new scenarios. Here's a more detailed explanation and an example to help you understand the process.

Detailed Explanation

When you fine-tune a model, it starts with the pre-trained weights from the base model (e.g., ada, babbage, curie, or davinci) and adjusts those weights based on the training data you provide. If you later obtain new data that you want to incorporate into your model, you can continue fine-tuning from the previous fine-tuned model. This means the new fine-tuning process will start with the weights already adjusted from the previous fine-tuning job, allowing the model to learn from the new data more efficiently.

Example: News Classification

Imagine you have already fine-tuned a model to classify news articles into categories like sports, politics, technology, and entertainment. You used a dataset of news articles and their corresponding categories for fine-tuning. The fine-tuned model is named `curie:ft-<org>-<date>`.

Now, you have collected additional news articles and their categories. Instead of retraining the model from scratch with the new data, you can continue fine-tuning from the existing fine-tuned model.

Combine the new articles with the original dataset or create a new dataset with just the new articles.

If needed, split the dataset into training and validation sets, ensuring that both sets have diverse examples representing all categories.

Format the examples as follows:

`{"prompt": "Classify the following news article: <news article>", "completion": " <category>"}`

Continue fine-tuning the model by passing in the fine-tuned model name:

```bash
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> \
 -v <VALIDATION_FILE_ID_OR_PATH> \
 -m curie:ft-<org>-<date>
```

If the new data is much smaller than the original dataset, consider reducing the learning_rate_multiplier:

```bash
openai api fine_tunes.create -t <TRAIN_FILE_ID_OR_PATH> \
  -v <VALIDATION_FILE_ID_OR_PATH> \
  -m curie:ft-<org>-<date> \
  --learning_rate_multiplier 0.025
```

By continuing the fine-tuning process from the previous model, you can efficiently incorporate the new data and potentially enhance your model's performance or adapt it to new situations.

Weights & Biases (W&B) is a platform that helps developers and data scientists build, track, and collaborate on machine learning models more efficiently. It provides tools to monitor experiments, manage datasets, evaluate model performance, visualize results, and share findings with colleagues. W&B simplifies the process of iterating on machine learning pipelines and serves as a reliable system of record for datasets and models.

Here are some key features of Weights & Biases:

Experiment tracking: W&B allows you to log and visualize metrics, hyperparameters, model architecture, and other experiment-related information. This helps you compare different experiments, understand how model performance evolves over time, and identify the best performing models.

Dataset versioning: W&B enables you to version and iterate on datasets. This makes it easier to keep track of changes in your data, reproduce previous results, and collaborate with your team.

Model evaluation: W&B provides tools to evaluate model performance, visualize results, and spot regressions. This helps you identify areas for improvement and ensure that your models are performing as expected.

Reproducibility: W&B maintains a record of all the configurations, hyperparameters, and dataset versions used in each experiment. This makes it easier to reproduce previous results and understand how different factors contribute to model performance.

Collaboration: W&B allows you to share your experiments, datasets, and models with your team. This promotes collaboration and helps your team make data-driven decisions.

To use Weights & Biases with OpenAI fine-tuning, you need a W&B account and a paid OpenAI plan. You can sync your fine-tunes with W&B by running:

```bash
pip install --upgrade openai wandb
openai wandb sync
```

This integration allows you to leverage W&B's powerful tools while fine-tuning OpenAI models, ensuring better tracking, collaboration, and experimentation. You can find more information on this integration in the [Weights & Biases documentation](https://docs.wandb.ai/).

The example notebooks provided on GitHub offer a hands-on approach to understanding how to fine-tune OpenAI models for specific tasks, such as classification and question-answering. They demonstrate the entire process, from data preparation to model deployment, and provide valuable insights into the best practices for fine-tuning.

Benefits of the example notebooks:

Classification notebook (finetuning-classification.ipynb):

Demonstrates the end-to-end process of creating a text classification model.
Helps you understand data exploration and how to prepare data for fine-tuning.
Shows how to fine-tune a model, interpret the results, and use the fine-tuned model for predictions.
Question-answering notebooks (olympics-1-collect-data.ipynb, olympics-2-create-qa.ipynb, olympics-3-train-qa.ipynb):

Illustrates the process of creating a question-answering model based on specific paragraphs of text.
Introduces the concept of adversarial examples to train the model to answer only when the context is sufficient.
The first notebook focuses on collecting and organizing recent data that GPT-3 hasn't seen during its pre-training.
The second notebook demonstrates how to use Davinci-instruct to ask and answer questions based on a given context.
The third notebook shows how to create a dataset with context, question, and answer pairs, as well as adversarial examples. It also demonstrates training a discriminator model that predicts whether a question can be answered based on the context.
By working through these notebooks, you can gain a deeper understanding of the fine-tuning process and learn how to adapt it to your specific needs. These examples also showcase best practices for handling data and model training, making them valuable resources for anyone interested in fine-tuning OpenAI models for real-world applications.

The author generated this text in part using `ChatGPT-4` or `ChatGPT-3.5`, OpenAI’s large-scale language-generation model. Upon generating draft language, the author did not reviewed, and revised all the language ultimately the reader shall understand that OpenAI, `ChatGPT-4` or other and the autor of the current doccument do not take any resposability for the content of this publication.

Content edited or modified sourced originally from OpeAI web site and may or may not be copyrighted Source: ([platform.openai.com/docs/guides/fine-tuning](https://platform.openai.com/docs/guides/fine-tuning) OpenAI © 2015 – 2023) The content on this page is: By Luxcium © 2023 (Benjamin Vincent Ksapoglu)

THE DOCUMENT IS PROVIDED "AS IS", WITHOUT WARRANTY OF ALL KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ALL CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE DOCUMENT OR THE USE OR OTHER DEALINGS IN THE DOCUMENT.
